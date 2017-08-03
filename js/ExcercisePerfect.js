var ExcercisePerfect = {

    state: 0,
    level: 0,
    two_tones: null,

    prev_tone: 0,
    current_tone: 0,
    current_answer: 0,
    wrong_tone0: 0,
    wrong_tone1: 0,

    num_tries: 0,

    entering_practice_mode: false,
    exiting_practice_mode: false,
    keys_down: 0,
    progress: null,
    kbrd: null,

    init: function () {
        this.two_tones = false;

        this.num_tries = 0;

        this.current_tone = -1;
        this.prev_tone = -1;
        this.current_answer = -1;

        this.kbrd = new Keyboard(true);
        Selectors.init(this);

        ExcerciseFns.initHiscores(this);
        ExcerciseFns.resetState(this);
        this.setLevel(0);
    },

    toString: function () {
        return 'excerciseperfect';
    },

    setLevel: function (i_lvl) {
        this.level = i_lvl;

        if (this.two_tones) {
            this.two_tones = false;
            this.correct_in_row[this.level] = 0;
        }

        ExcerciseFns.setState(this, ExcerciseStates.pending);
    },

    getLevel: function () {
        return this.level;
    },

    getLevelName: function () {
        if (!this.two_tones)
            return "";

        var t1 = this.wrong_tone0;
        var t2 = this.wrong_tone1;

        if (t1 > t2) {
            var swap = t1;
            t1 = t2;
            t2 = swap;
        }

        return Constants.generalToneName(t1) + " / " + Constants.generalToneName(t2);
    },

    getNumLevels: function () {
        return 11;
    },

    mouseMove: function (x, y) {
    },

    getKeyboardFocusX: function () {
        var keyboard_x;

        var from = this.getOctaveIndex() * 12;
        keyboard_x = KbdMeasurements.getKeyDisplayX(from);
        if (keyboard_x + Constants.scr_w > KbdMeasurements.getRightBorderX())
            keyboard_x = KbdMeasurements.getRightBorderX() - Constants.scr_w;

        return keyboard_x;
    },

    getOctaveIndex: function () {
        if (this.current_tone !== -1)
            return Math.floor(this.current_tone / 12);

        return 0;
    },

    mouseDown: function (x, y) {
        var playbtn = document.getElementById("playbtn");
        if (playbtn.offsetLeft < x && playbtn.offsetLeft + playbtn.clientWidth >= x && playbtn.offsetTop < y && playbtn.offsetTop + playbtn.clientHeight >= y)
            return;//let playbtn handle the click

        ExcerciseFns.clickedAnywhere(this);
        this.keyPressed(this.kbrd.keyHitTest(x, y, this.getKeyboardFocusX()));
        this.draw();
        setTimeout(ExcercisePerfect.mouseUp, 600);
    },

    mouseUp: function (x, y) {
        this.kbrd.mouseUp();
        this.draw();
    },

    newTask: function () {
        this.current_tone = this.randomTone();
    },

    randomTone: function () {
        var ret = this.current_tone;
        while (ret === this.current_tone)
            ret = this._randomTone();
        return ret;
    },

    _randomTone: function () {
        var octave_ind = RandomUtil.getMod(Constants.num_octaves);
        if (this.two_tones) {
            var tone_ind = RandomUtil.getMod(2);

            return ((tone_ind === 0) ? this.wrong_tone0 : this.wrong_tone1) +
                octave_ind * Constants.num_tones_in_octave;
        }
        var num_tones = Math.min(this.level, Constants.num_levels - 1) + 2;
        tone_ind = RandomUtil.getMod(num_tones);
        return (Constants.tones[tone_ind] + octave_ind * Constants.num_tones_in_octave);
    },

    clickedAnywhere: function () {
        if (this.state === ExcerciseStates.answered || this.state === ExcerciseStates.level_complete)
            ExcerciseFns.setState(this, ExcerciseStates.pending);
    },

    playTask: function () {
        if (this.state === ExcerciseStates.pending || this.state === ExcerciseStates.level_complete || this.state === ExcerciseStates.game_over) {
            this.newTask();
            ExcerciseFns.setState(this, ExcerciseStates.waiting);
        }

        SoundManager.playSound(this.current_tone);
        this.draw();
    },

    isActive: function (key) {
        var keymod = key % Constants.num_tones_in_octave;

        if (this.two_tones)
            return (keymod === this.wrong_tone0 || keymod === this.wrong_tone1);

        for (var i = 0; i < this.level + 2; ++i)
            if (Constants.tones[i] === keymod)
                return true;

        return false;
    },

    keyPressed: function (key_num) {
        if (key_num === -1)
            return;

        SoundManager.playSound(key_num);

        if (this.state === ExcerciseStates.waiting && this.isActive(key_num)) {
            ++this.num_tries;
            this.current_answer = key_num;
            var correct = TestingHelper.always_true ? true : ( this.current_answer === this.current_tone);// % Constants.num_tones_in_octave);

            if (correct) {
                ++this.correct_in_row[this.level];
            }
            else {
                this.correct_in_row[this.level] = 0;

                if (this.level > 0 && !this.two_tones && (this.current_answer % Constants.num_tones_in_octave !== this.current_tone % Constants.num_tones_in_octave)) {
                    this.two_tones = true;
                    this.wrong_tone0 = this.current_answer % Constants.num_tones_in_octave;
                    this.wrong_tone1 = this.current_tone % Constants.num_tones_in_octave;
                    this.entering_practice_mode = true;
                }
            }

            ExcerciseFns.updateProgress(this, !this.two_tones);

            if (this.two_tones) {
                if (this.correct_in_row[this.level] >= this.getCorrectNeeded()) {
                    this.correct_in_row[this.level] = 0;
                    this.two_tones = false;
                    this.exiting_practice_mode = true;
                }
                ExcerciseFns.setState(this, ExcerciseStates.answered);
            }
            else {
                ExcerciseFns.setState(this, ExcerciseStates.answered);
                ExcerciseFns.checkLevelComplete(this);
            }
        }
        this.draw();
    },

    getCorrectInRow: function () {
        return this.correct_in_row[this.level];
    },

    getCorrectNeeded: function () {
        if (TestingHelper.testing)
            return 1;
        if (this.two_tones)
            return 10;
        if (this.level < 4)
            return 20;
        if (this.level < 8)
            return 25;
        return 30;
    },

    getPromptText: function () {
        return "What tone is it?";
    },

    getPendingText: function () {
        return "Press play to hear tone.";
    },

    getAnswerText: function () {
        return "";
    },

    getAnsweredText: function () {
        var res = Answers.getLongAnswer(Constants.longToneName(this.current_tone),
            Constants.longToneName(this.current_answer),
            this.num_tries + this.current_tone);

        if (this.entering_practice_mode) {
            this.entering_practice_mode = false;
            return res + "<br>Let's practice these two tones a bit.";
        }

        if (this.exiting_practice_mode) {
            this.exiting_practice_mode = false;
            return res + "<br>Enough with these two tones.";
        }

        return res + "<br>Press play to hear next tone";
    },

    getLevelCompleteText: function () {
        return ("Level " + (this.level + 1) + "<br>" + "New tone: " + Constants.tone_names[Constants.tones[this.level + 1]]);
    },

    getGameOverText: function () {
        return "Congratulations, great job!<br> It doesn't get any harder than this.";
    },

    draw: function () {
        ExcerciseFns.updateProgress(this, !this.two_tones);
        var canvas = document.getElementById("canvas");
        this.context = canvas.getContext("2d");
        this.context.clearRect(0, 0, Constants.scr_w, Constants.scr_h);
        this.drawKeys(0, KbdMeasurements.getKeyDisplayH());
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

        if (KbdMeasurements.getNumKeysOnScreen() < Constants.num_octaves * 7)
            this.kbrd.subscribeKeyFull(this.getOctaveIndex() * 12, this.getKeyboardFocusX());
    }
};
