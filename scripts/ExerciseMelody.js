"use strict";

define("exerciseMelody",
    ["Constants", "Selectors", "Sequence", "Keyboard", "KbdMeasurements", "exerciseFns", "exerciseStates",
        "Answers", "TestingHelper"],
    function (Constants, Selectors, Sequence, Keyboard, KbdMeasurements, exerciseFns, exerciseStates,
              Answers, TestingHelper) {

        return {
            root: 0,
            num_tries: 0,
            state: 0,
            level: 0,
            length: 0,
            mistaken: false,
            current_seq: null,
            current_answer: null,
            wrong_tone: null,
            kbrd: null,
            template: "ex_Melody.html",

            init: function () {
                this.num_tries = 0;
                this.root = 0;
                this.length = 5;
                Selectors.init(this);
                this.kbrd = new Keyboard(false);

                exerciseFns.initHiscores(this);
                exerciseFns.resetState(this);


                // SequencePlayer.playing = false; TODO remove
                this.setLevel(0);
            },

            toString: function () {
                return 'exercisemelody';
            },

            setRoot: function (i_root) {
                this.root = i_root;
                exerciseFns.setState(this, exerciseStates.pending);
            },

            getRoot: function () {
                return this.root;
            },

            setLevel: function (i_lvl) {
                this.level = i_lvl;

                exerciseFns.setState(this, exerciseStates.pending);
            },

            getLevelName: function () {
                return Constants.level_names[this.level];
            },

            newTask: function () {
                this.current_seq = new Sequence();
                this.current_seq.Randomize(this.level, this.root, this.length);
                this.current_answer = new Sequence(0);
                this.mistaken = false;
            },

            playTask: function () {
                if (this.state === exerciseStates.answered)
                    exerciseFns.setState(this, exerciseStates.pending);

                if (this.state === exerciseStates.pending || this.state === exerciseStates.level_complete || this.state === exerciseStates.game_over) {
                    this.newTask();
                    exerciseFns.setState(this, exerciseStates.waiting);
                }

                this.instrument.playSequence(this.current_seq);
                this.draw();
            },

            isActive: function (key) {
                for (var i = 0; i < Constants.steps_by_levels[this.level].length; ++i)
                    if ((key + Constants.num_tones_in_octave - this.root) % Constants.num_tones_in_octave === Constants.steps_by_levels[this.level][i])
                        return true;

                return false;
            },

            keyPressed: function (key) {
                if (key < 0)
                    return;
                this.instrument.playNote(key);

                if (this.state !== exerciseStates.waiting || !this.isActive(key))
                    return;

                ++this.num_tries;
                if (key !== this.current_seq.ith(this.current_answer.len()) && !TestingHelper.always_true) {
                    this.correct_in_row[this.getLevel()] = 0;
                    this.wrong_tone = key;
                    this.mistaken = true;
                }
                else
                    this.wrong_tone = null;

                if (this.wrong_tone === null)
                    this.current_answer.add(key);

                exerciseFns.setState(this, exerciseStates.waiting);

                if (this.current_answer.len() !== this.current_seq.len())
                    return;

                if (!this.mistaken)
                    ++this.correct_in_row[this.getLevel()];
                exerciseFns.updateProgress(this);

                exerciseFns.setState(this, exerciseStates.answered);
                exerciseFns.checkLevelComplete(this);
            },

            getCorrectNeeded: function () {
                if (TestingHelper.testing)
                    return 1;
                if (this.level < 5)
                    return 5;
                if (this.level < 10)
                    return 7;
                if (this.level < 15)
                    return 10;
                if (this.level < 20)
                    return 15;
                return 10000;
            },

            getLevel: function () {
                return this.level;
            },

            getNumLevels: function () {
                return Constants.getNumMelodyLevels();
            },

            getKeyStates: function () {
                var key_states = [];
                for (var octave_ind = 0; octave_ind < Constants.num_octaves; ++octave_ind)
                    for (var tone_ind = 0; tone_ind < Constants.num_tones_in_octave; ++tone_ind)
                        key_states.push(this.isActive(tone_ind + octave_ind * Constants.num_tones_in_octave));

                return key_states;
            },

            toneName: function (tone) {
                return Constants.toneNameInKey(tone, this.root, Constants.isMajor(this.level));
            },

            longToneName: function (tone) {
                return Constants.longToneNameInKey(tone, this.root, Constants.isMajor(this.level));
            },

            getAnswerText: function () {
                if (this.current_answer.len() === 0)
                    return "";
                var correct_answer = this.current_seq.ith(this.current_answer.len() - 1);
                var answer = (this.wrong_tone === null) ? this.current_answer.ith(this.current_answer.len() - 1) : this.wrong_tone;

                return Answers.getShortAnswer(this.longToneName(correct_answer),
                    this.longToneName(answer),
                    this.num_tries + this.current_seq.root());
            },

            getPromptText: function () {
                var text = this.toneName(this.current_seq.sequence[0]);
                for (var i = 1; i < this.current_seq.len(); ++i)
                    if (i < this.current_answer.len() && this.current_answer.ith(i) === this.current_seq.ith(i))
                        text += " - " + this.toneName(this.current_answer.ith(i));
                    else
                        text += " - ?";

                return text;
            },

            getPendingText: function () {
                return "Press play to hear melody";
            },

            getAnsweredText: function () {
                var text = "";
                if (this.mistaken)
                    text = "There were some mistakes.<br>Press play to hear melody";
                else
                    text = "That was correct.<br>Press play to hear next melody";
                return text;
            },

            getLevelCompleteText: function () {
                return "Level " + (this.level + 1) + " <br>Press play to hear melody.";
            },

            getGameOverText: function () {
                return "Congratulations, great job!<br> It doesn't get any harder than this.";
            },

            getKeyboardFocusX: function () {
                var keyboard_x = 0;
                if (this.current_seq !== null) {
                    var from = this.current_seq.from;
                    keyboard_x = KbdMeasurements.getKeyDisplayX(from);
                    if (keyboard_x + Constants.scr_w > KbdMeasurements.getRightBorderX())
                        keyboard_x = KbdMeasurements.getRightBorderX() - Constants.scr_w;
                }
                return keyboard_x;
            },

            draw: function () {
                //alert("drawing");
                //return;
                exerciseFns.updateProgress(this);
                var canvas = document.getElementById("canvas");
                var context = canvas.getContext("2d");

                // canvas.width = canvas.width; // TODO remove?
                //context.setTransform(1, 0, 0, 1, 0, 0);
                context.clearRect(0, 0, canvas.width, canvas.height);//Constants.scr_w, Constants.scr_h);
                context.fillStyle = "black";
                context.fillRect(0, 0, canvas.width, canvas.height);

                this.drawKeys(0, KbdMeasurements.getKeyDisplayH());
            },

            drawKeys: function (x, y) {
                var keyboard_x = this.getKeyboardFocusX();
                var key_states = this.getKeyStates();

                this.kbrd.draw(keyboard_x, y, key_states);
                if (this.state === exerciseStates.waiting) {
                    this.kbrd.subscribeKey(this.current_seq.sequence[0], this.getKeyboardFocusX());
                } else {
                    this.kbrd.hideSubscribeKey();
                }
            },

            mouseMove: function (x, y) {
            },

            mouseUp: function (x, y) {
                this.kbrd.mouseUp();
                this.draw();
            },

            mouseDown: function (x, y) {
                this.keyPressed(this.kbrd.keyHitTest(x, y, this.getKeyboardFocusX()));
                this.draw();
                setTimeout(this.mouseUp.bind(this), 600);
            }
        };
    }
);
