"use strict";

define("ExerciseFns", ["Config", "Constants", "Target", "ExerciseState"],
    function (Config, Constants, Target, ExerciseState) {

        return {
            init: function (ex) {
                this.exercise = ex;
                this.initHiscores(ex);
                this.resetState(ex);
            },

            initHiscores: function (ex) {
                ex.hiscores = new Array(ex.getNumLevels());
                for (var ind = 0; ind < ex.hiscores.length; ++ind)
                    ex.hiscores[ind] = 0;


                if (Config.target === Target.WEB) {
                    var storage = window.localStorage;
                    if (storage[ex.toString()])
                        ex.hiscores = JSON.parse(storage[ex.toString()]);
                }


                ex.correct_in_row = new Array(ex.getNumLevels());
                for (ind = 0; ind < ex.correct_in_row.length; ++ind)
                    ex.correct_in_row[ind] = 0;


                this.updateProgress(ex, true);
            },

            resetState: function (ex) {
                this.setState(ex, ExerciseState.PENDING);
            },

            clickedAnywhere: function (ex) {
                if (ex.state === ExerciseState.ANSWERED || ex.state === ExerciseState.LEVEL_COMPLETED || ex.state === ExerciseState.GAME_OVER)
                    this.resetState(ex);
            },

            updateProgress: function (ex, update_hiscores) {
                update_hiscores = typeof update_hiscores === 'undefined' ? true : update_hiscores;//update hiscores by default

                if (update_hiscores)
                    this.updateHiscores(ex);
                var progress_correct = (document.getElementsByClassName("progress_current"))[0];
                var correct_percent = Math.min(Constants.scr_w, Math.floor(this.getCorrectInRow(ex) / ex.getCorrectNeeded() * Constants.scr_w));

                progress_correct.style.width = correct_percent.toString() + "px";
                var text_correct = (document.getElementsByClassName("correct_text"))[0];
                text_correct.textContent = "Correct:" + this.getCorrectInRow(ex).toString() + "/" + ex.getCorrectNeeded();

                if (update_hiscores) {
                    var progress_hiscore = (document.getElementsByClassName("progress_hisc"))[0];
                    var hiscore_percent = Math.min(Constants.scr_w, Math.floor(ex.hiscores[ex.level] / ex.getCorrectNeeded() * Constants.scr_w));
                    progress_hiscore.style.width = hiscore_percent.toString() + "px";
                    var text_hiscore = (document.getElementsByClassName("hiscore_text"))[0];
                    text_hiscore.textContent = "Hiscore:" + ex.hiscores[ex.level];
                }
                else
                    this.hideHiscores();

            },

            updateHiscores: function (ex) {
                if (ex.hiscores[ex.level] < this.getCorrectInRow(ex))
                    ex.hiscores[ex.level] = this.getCorrectInRow(ex);

                if (Config.target === Target.WEB) {
                    var storage = window.localStorage;
                    if (!storage[ex.toString()])
                        storage[ex.toString()] = [];

                    storage[ex.toString()] = JSON.stringify(ex.hiscores);
                }
            },

            hideHiscores: function () {
                var progress_hiscore = (document.getElementsByClassName("progress_hisc"))[0];
                progress_hiscore.style.width = "0%";
                var text_hiscore = (document.getElementsByClassName("hiscore_text"))[0];
                text_hiscore.textContent = "";
            },

            checkLevelComplete: function (ex) {
                if (this.getCorrectInRow(ex) !== ex.getCorrectNeeded())
                    return;

                if (ex.level < ex.getNumLevels() - 1) {
                    ++ex.level;
                    this.setState(ex, ExerciseState.LEVEL_COMPLETED);
                }
                else
                    this.setState(ex, ExerciseState.GAME_OVER);
            },

            getCorrectInRow: function (ex) {
                return ex.correct_in_row[ex.level];
            },

            getHiscore: function (ex) {
                return ex.hiscores[ex.level];
            },

            playOrRepeat: function (ex) {
                return ex.state !== ExerciseState.WAITING && ex.state !== ExerciseState.WAITING_0 && ex.state !== ExerciseState.WAITING_1;
            },

            setState: function (ex, i_state) {
                ex.state = i_state;
                var btn = document.getElementById("playbtn");
                btn.textContent = this.playOrRepeat(ex) ? "Play" : "Repeat";
                btn.disabled = false;

                var text = null;
                switch (ex.state) {
                    case ExerciseState.PENDING:
                        text = ex.getPendingText();
                        break;
                    case ExerciseState.WAITING:
                        text = ex.getPromptText() + "<br>" + ex.getAnswerText();
                        break;
                    case ExerciseState.WAITING_0:
                        text = ex.getPromptText();
                        break;
                    case ExerciseState.WAITING_1:
                        text = ex.getPromptText() + "<br>" + ex.getAnswerText();
                        break;
                    case ExerciseState.ANSWERED:
                        text = ex.getAnsweredText();
                        break;
                    case ExerciseState.LEVEL_COMPLETED:
                        text = ex.getLevelCompleteText();
                        break;
                    case ExerciseState.GAME_OVER:
                        text = ex.getGameOverText();
                        break;
                    default:

                        break;
                }

                this.exercise.enableKeySelection(ex.state === ExerciseState.PENDING || ex.state === ExerciseState.ANSWERED);

                var textfield = document.getElementsByClassName("infozone");
                textfield[0].innerHTML = text;
                ex.draw();
            }
        };
    }
);
