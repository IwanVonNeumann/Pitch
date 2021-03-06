﻿define("ExerciseIntervals",
    ["Constants", "Selectors", "Interval", "SequencePlayer", "ExerciseFns", "ExerciseState", "TestingHelper",
        "Answers", "KbdMeasurements", "Keyboard"],
    function (Constants, Selectors, Interval, SequencePlayer, exerciseFns, ExerciseState, TestingHelper,
              Answers, KbdMeasurements, Keyboard) {

        return {
            state: ExerciseState.PENDING,
            two_intervals: null,
            correct_in_row: null,
            level: 0,
            current_interval: 0,
            current_answer: 0,
            wrong_interval0: 0,
            wrong_interval1: 0,
            num_tries: 0,

            entering_practice_mode: false,
            exiting_practice_mode: false,

            keys_h: 150,
            keys_down: 0,
            hiscores: 0,

            kbrd: null,
            progress: null,

            root_text: null,
            template: "ExerciseIntervals.html",

            init: function () {
                this.two_intervals = false;

                this.num_tries = 0;
                this.current_interval = new Interval();
                this.current_answer = new Interval();

                this.kbrd = new Keyboard(false);
                Selectors.init(this);

                SequencePlayer.playing = false;

                exerciseFns.initHiscores(this);
                exerciseFns.resetState(this);
                this.setLevel(0);
            },

            toString: function () {
                return 'exerciseintervals';
            },

            setLevel: function (i_lvl) {
                this.level = i_lvl;
                if (this.two_intervals) {
                    this.two_intervals = false;
                    this.correct_in_row[this.level] = 0;
                }

                exerciseFns.setState(this, ExerciseState.PENDING);
            },

            getLevel: function () {
                return this.level;
            },

            getLevelName: function () {
                if (!this.two_intervals)
                    return "";

                var int1 = Math.abs(this.wrong_interval0);
                var int2 = Math.abs(this.wrong_interval1);

                if (int1 > int2) {
                    var swap = int1;
                    int1 = int2;
                    int2 = swap;
                }

                return Constants.interval_names[int1] + " / " + Constants.interval_names[int2];
            },

            getNumLevels: function () {
                return Constants.intervals.length - 1;
            },

            mouseMove: function (x, y) {
            },

            mouseDown: function (x, y) {
                var playbtn = document.getElementById("playbtn");

                if (playbtn.offsetLeft < x && playbtn.offsetLeft + playbtn.clientWidth >= x && playbtn.offsetTop < y && playbtn.offsetTop + playbtn.clientHeight >= y)
                    return;//let playbtn handle the click
                exerciseFns.clickedAnywhere(this);
                this.keyPressed(this.kbrd.keyHitTest(x, y, this.getKeyboardFocusX()));
                this.draw();
                setTimeout(this.mouseUp.bind(this), 600);
            },

            mouseUp: function (x, y) {
                this.kbrd.mouseUp();
                this.draw();
            },

            newTask: function () {
                if (this.two_intervals)
                    this.current_interval.randomOfTwo(this.wrong_interval0, this.wrong_interval1);
                else
                    this.current_interval.randomInterval(this.getLevel());
            },

            playTask: function () {
                if (this.state === ExerciseState.ANSWERED)
                    exerciseFns.setState(this, ExerciseState.PENDING);

                if (this.state === ExerciseState.PENDING || this.state === ExerciseState.LEVEL_COMPLETED || this.state === ExerciseState.GAME_OVER) {
                    this.newTask();
                    exerciseFns.setState(this, ExerciseState.WAITING_0);
                }

                this.current_interval.play();
                this.draw();
            },

            isActive: function (key) {
                if (this.getLevel() === this.getNumLevels())
                    return true;

                if (this.state === ExerciseState.PENDING)
                    return false;

                var root = this.current_interval.tone0;
                var diff = key - root;

                if (key === root)
                    return true;

                if (this.two_intervals)
                    return (Math.abs(diff) === Math.abs(this.wrong_interval0) || Math.abs(diff) === Math.abs(this.wrong_interval1));

                for (var i = 0; i < this.getLevel() + 2; ++i)
                    if (Constants.intervals[i] === Math.abs(diff))
                        return true;

                return false;
            },

            keyPressed: function (key_num) {
                if (key_num < 0)
                    return;

                this.game.soundManager.playSound(key_num);

                if (this.state === ExerciseState.WAITING_0 && this.isActive(key_num)) {
                    if (key_num !== this.current_interval.tone0)
                        return;

                    ++this.num_tries;
                    this.current_answer.tone0 = key_num;
                    exerciseFns.setState(this, ExerciseState.WAITING_1);
                    return;
                }

                if (this.state === ExerciseState.WAITING_1 && this.isActive(key_num)) {
                    if (key_num === this.current_interval.tone0)
                        return;

                    ++this.num_tries;
                    this.current_answer.diff = key_num - this.current_answer.tone0;

                    var correct = TestingHelper.always_true ? true : (this.current_answer.equal(this.current_interval));

                    if (correct)
                        ++this.correct_in_row[this.level];
                    else {
                        this.correct_in_row[this.level] = 0;

                        if (this.getLevel() > 0 && !this.two_intervals && Math.abs(this.current_interval.diff) !== Math.abs(this.current_answer.diff)) {
                            this.two_intervals = true;
                            this.wrong_interval0 = this.current_answer.diff;
                            this.wrong_interval1 = this.current_interval.diff;
                            this.entering_practice_mode = true;
                        }
                    }

                    exerciseFns.updateProgress(this, !this.two_intervals);

                    if (this.two_intervals) {
                        if (this.correct_in_row[this.level] >= this.getCorrectNeeded()) {
                            this.correct_in_row[this.level] = 0;
                            this.two_intervals = false;
                            this.exiting_practice_mode = true;
                        }
                        exerciseFns.setState(this, ExerciseState.ANSWERED);
                    }
                    else {
                        exerciseFns.setState(this, ExerciseState.ANSWERED);
                        exerciseFns.checkLevelComplete(this);
                    }

                    this.draw();
                }
            },

            getCorrectNeeded: function () {
                if (TestingHelper.testing)
                    return 1;

                if (this.two_intervals)
                    return 10;

                if (this.getLevel() < 4)
                    return 15;

                if (this.getLevel() < 8)
                    return 25;

                return 30;
            },

            getAnswerText: function () {
                return Answers.getLongAnswer(Constants.toneName(this.current_interval.tone0),
                    Constants.toneName(this.current_answer.tone0),
                    this.num_tries + this.current_interval.tone0,
                    this.current_interval.tone0 === this.current_answer.tone0);
            },

            getPromptText: function () {
                var s = Constants.toneName(this.current_interval.tone0) + " - ?";
                if (this.state === ExerciseState.WAITING_0)
                    s += "<br> Play the two tones on the keyboard.";
                return s;
            },

            getPendingText: function () {
                return "Press play to hear interval.";
            },

            getAnsweredText: function () {
                var res = Answers.getLongAnswer(this.current_interval.toString(),
                    this.current_answer.toString(),
                    this.num_tries + this.current_interval.tone0,
                    this.current_answer.equal(this.current_interval));

                if (this.entering_practice_mode) {
                    this.entering_practice_mode = false;
                    return res + "<br>Let's practice these two intervals a bit.";
                }

                if (this.exiting_practice_mode) {
                    this.exiting_practice_mode = false;
                    return res + "<br>Enough with these two intervals.";
                }

                return res + "<br>Press play to hear next interval";
            },

            getLevelCompleteText: function () {
                var text = ("Level " + (this.getLevel() + 1) + "<br>" + "New interval: ");

                //if(this.getLevel() == 0)
                //text += (Constants.interval_names[Constants.intervals[0]] + " / " + Constants.interval_names[Constants.intervals[1]]);
                //else
                text += (Constants.interval_names[Constants.intervals[this.getLevel() + 1]]);

                return text;
            },

            getGameOverText: function () {
                return "Congratulations, great job!<br> It doesn't get any harder than this.";
            },

            draw: function () {
                exerciseFns.updateProgress(this, !this.two_intervals);
                var canvas = document.getElementById("canvas");
                var context = canvas.getContext("2d");
                context.clearRect(0, 0, Constants.scr_w, Constants.scr_h);

                this.drawKeys(0, KbdMeasurements.getKeyDisplayH());
            },

            getKeyboardFocusX: function () {
                var keyboard_x = 0;
                if (this.current_interval.tone0 !== -1) {
                    var from = 0;

                    if (this.current_interval.diff >= 0)
                        from = this.current_interval.tone0;
                    else
                        from = Math.max(0, this.current_interval.tone0 - 12);

                    keyboard_x = KbdMeasurements.getKeyDisplayX(from);
                    if (keyboard_x + Constants.scr_w > KbdMeasurements.getRightBorderX())
                        keyboard_x = KbdMeasurements.getRightBorderX() - Constants.scr_w;
                }
                return keyboard_x;
            },

            getKeyStates: function () {
                var key_states = [];
                for (var octave_ind = 0; octave_ind < Constants.num_octaves; ++octave_ind)
                    for (var tone_ind = 0; tone_ind < Constants.num_tones_in_octave; ++tone_ind)
                        key_states.push(this.isActive(tone_ind + octave_ind * Constants.num_tones_in_octave));

                return key_states;
            },

            drawKeys: function (x, y) {
                var keyboard_x = this.getKeyboardFocusX();
                var key_states = this.getKeyStates();

                this.kbrd.draw(keyboard_x, y, key_states);
                if (this.state === ExerciseState.WAITING_0 || this.state === ExerciseState.WAITING_1) {
                    this.kbrd.subscribeKey(this.current_interval.tone0, this.getKeyboardFocusX());
                } else {
                    this.kbrd.hideSubscribeKey();
                }
            }
        };
    }
);
