﻿var ExcerciseChordTypes = {

    state: 0,
    two_chords: null,
    correct_in_row: null,
    level: 0,
    current_chord: 0,
    current_answer: 0,
    wrong_type0: 0,
    wrong_type1: 0,
    num_tries: 0,
    chord_btns: 0,

    progress: null,
    kbrd: null,
    entering_practice_mode: false,
    exiting_practice_mode: false,

    init: function () {
        this.two_chords = false;

        this.num_tries = 0;
        this.current_chord = new Chord(12, 12, 0);
        this.current_answer = new Chord(12, 12, 0);

        for (var i = 0; i < ChordTypes.num_chords; ++i) {
            var btn = document.getElementById(ChordTypes.ShortName(i));
            btn.textContent = ChordTypes.Name(i);
            btn.onclick = (function (ii) {
                return function () {
                    ExcerciseChordTypes.buttonDown(ii);
                }
            })(i);
        }

        Selectors.init(this);

        ExcerciseFns.initHiscores(this);
        ExcerciseFns.resetState(this);
        this.setLevel(0);
    },

    toString: function () {
        return 'excercisechordtypes';
    },

    setLevel: function (i_lvl) {
        this.level = i_lvl;

        if (this.two_chords) {
            this.two_chords = false;
            this.correct_in_row[this.level] = 0;
        }

        ExcerciseFns.setState(this, ExcerciseStates.pending);

        this.updateBtnEnabling();
    },

    getLevel: function () {
        return this.level;
    },

    newTask: function () {
        if (this.two_chords)
            this.current_chord.randomOfTwo(this.wrong_type0, this.wrong_type1);
        else
            this.current_chord.randomChord(this.getLevel());
    },

    playTask: function () {
        if (this.state === ExcerciseStates.pending || this.state === ExcerciseStates.level_complete || this.state === ExcerciseStates.game_over) {
            this.newTask();
            ExcerciseFns.setState(this, ExcerciseStates.waiting);
        }

        this.current_chord.play();
        this.draw();
    },

    getNumLevels: function () {
        return ChordTypes.num_chords - 1;
    },

    mouseUp: function (x, y) {
    },

    mouseMove: function (x, y) {
    },

    buttonDown: function (ind) {
        var chord = new Chord(this.current_chord.root, this.current_chord.root, ind);
        chord.play();
        //   if (this.chord_btns[i].isEnabled() && this.chord_btns[i].hitTestPoint(x, y))
        if (this.state === ExcerciseStates.waiting) {
            this.current_answer = chord;

            var correct = TestingHelper.always_true ? true : (this.current_answer.type === this.current_chord.type);

            if (correct)
                ++this.correct_in_row[this.level];
            else {
                this.correct_in_row[this.level] = 0;

                if (this.level > 0 && !this.two_chords) {
                    this.two_chords = true;
                    this.wrong_type0 = this.current_answer.type;
                    this.wrong_type1 = this.current_chord.type;
                    this.entering_practice_mode = true;
                }
            }

            ExcerciseFns.updateProgress(this, !this.two_chords);

            if (this.two_chords) {
                if (this.correct_in_row[this.level] >= this.getCorrectNeeded()) {
                    this.correct_in_row[this.level] = 0;
                    this.two_chords = false;
                    this.exiting_practice_mode = true;
                }
                ExcerciseFns.setState(this, ExcerciseStates.answered);
            }
            else {
                ExcerciseFns.setState(this, ExcerciseStates.answered);
                ExcerciseFns.checkLevelComplete(this);
            }

        }
    },

    getLevelName: function () {
        if (!this.two_chords)
            return "";

        var c1 = Math.abs(this.wrong_type0);
        var c2 = Math.abs(this.wrong_type1);

        if (c1 > c2) {
            var swap = c1;
            c1 = c2;
            c2 = swap;
        }

        return ChordTypes.Name(c1) + " / " + ChordTypes.Name(c2);
    },

    mouseDown: function (x, y) {
        var playbtn = document.getElementById("playbtn");
        if (playbtn.offsetLeft < x && playbtn.offsetLeft + playbtn.clientWidth >= x && playbtn.offsetTop < y && playbtn.offsetTop + playbtn.clientHeight >= y)
            return;//let playbtn handle the click

        ExcerciseFns.clickedAnywhere(this);

        this.updateBtnEnabling();
    },

    getCorrectInRow: function () {
        return this.correct_in_row;
    },

    getCorrectNeeded: function () {
        if (TestingHelper.testing)
            return 1;

        if (this.two_chords)
            return 10;

        if (this.getLevel() < 4)
            return 15;

        if (this.getLevel() < 8)
            return 25;

        return 40;
    },

    updateBtnEnabling: function () {
        for (var i = 0; i < ChordTypes.num_chords; ++i) {
            var btn = document.getElementById(ChordTypes.ShortName(i));
            btn.disabled = !(i <= this.getLevel() + 1);

            if (this.two_chords)
                btn.disabled = !((i === this.wrong_type0) || (i === this.wrong_type1));
        }
        // for (var i = 0; i < this.chord_btns.length; ++i)
        // {
        //   this.chord_btns[i].setEnabled(i <= this.getLevel() + 1);

        //   if (this.two_chords)
        //     this.chord_btns[i].setEnabled((i == this.wrong_type0) || (i == this.wrong_type1));
        // }
    },

    subscribeChord: function () {
    },

    getPromptText: function () {
        return "What chord is it?";
    },

    getPendingText: function () {
        return "Press play to hear chord.";
    },

    getAnswerText: function () {
        return "";
    },

    getAnsweredText: function () {
        var res = Answers.getLongAnswer(this.current_chord.typeToString(),
            this.current_answer.typeToString(),
            this.num_tries + this.current_chord.type);

        if (this.entering_practice_mode) {
            this.entering_practice_mode = false;
            return res + "<br>Let's practice these two chords a bit.";
        }

        if (this.exiting_practice_mode) {
            this.exiting_practice_mode = false;
            return res + "<br>Enough with these two chords.";
        }

        return res + "<br>Press play to hear next chord";
    },

    getLevelCompleteText: function () {
        return "Level " + (this.level + 1) + "<br>" + "New chord: " + ChordTypes.Name(this.getLevel() + 1);
    },

    getGameOverText: function () {
        return "Congratulations, great job!<br> It doesn't get any harder than this.";
    },

    draw: function () {
        ExcerciseFns.updateProgress(this, !this.two_chords);
        this.updateBtnEnabling();
    }
};
