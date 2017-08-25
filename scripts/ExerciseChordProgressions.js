define("exerciseChordProgressions",
    ["Constants", "Selectors", "exerciseFns", "exerciseStates", "ChordType", "ChordSequenceType", "ChordSequence",
        "ChordSequencePlayer", "Answers", "TestingHelper"],
    function (Constants, Selectors, exerciseFns, exerciseStates, ChordType, ChordSequenceType, ChordSequence,
              ChordSequencePlayer, Answers, TestingHelper) {

        return {
            state: 0,
            level: 0,
            correct_in_row: 0,
            mistaken: 0,
            wrong_chord: 0,
            num_tries: 0,
            root: 0,

            seq: null,
            current_seq: null,
            current_answer: null,
            chord_btns: null,
            key_selector: null,
            template: "ex_ChordProgressions.html",

            init: function () {
                // this.current_seq = new ChordSequence(this.root, 4, this.level);
                // this.current_seq.Randomize(4, this.level, this.root);

                this.num_tries = 0;
                // this.current_answer = new ChordSequence(this.root, 0, this.level);
                this.root = 0;

                Selectors.init(this);
                exerciseFns.initHiscores(this);
                exerciseFns.resetState(this);
                ChordSequencePlayer.playing = false;
                this.setLevel(0);
                this.resetButtonLabels();
                this.newTask();
            },

            toString: function () {
                return 'exercisechords';
            },

            resetButtonLabels: function () {
                var area = document.getElementById("chords");

                while (true) {
                    var btns = document.getElementsByClassName("chord_progression_btn");
                    if (btns.length === 0)
                        break;
                    area.removeChild(btns[0]);
                }

                var full_w = area.clientWidth;
                var full_h = area.clientHeight;

                //positions
                var posx = -1;
                var prevchord = -1;
                var posy = 0;

                var num_btns = this.isLevelMajor() ? ChordSequenceType.num_maj_chords : ChordSequenceType.num_min_chords;
                this.chord_btns = new Array(num_btns);

                for (var i = 0; i < num_btns; ++i) {
                    //int pad = 2;
                    var w = Math.floor(full_w / 7);
                    if (this.isLevelMajor()) {
                        //pad = 0;
                        w = Math.floor(full_w / 9);
                    }
                    var h = Math.floor(full_h / 3) - 2;
                    var chn = i;
                    if (this.isLevelMajor())
                        chn += ChordSequenceType.minmaj_shift;
                    var ch = ChordSequenceType.createChord(12, chn, this.root);
                    var chord_root = ch.root - this.root;

                    if (prevchord !== chord_root) {
                        ++posx;
                        posy = 0;
                    }
                    else
                        ++posy;

                    prevchord = chord_root;

                    this.chord_btns[i] = document.createElement("button");
                    this.chord_btns[i].className = "chord_progression_btn";
                    this.chord_btns[i].style.left = ((posx % 12) * w).toString() + "px";
                    this.chord_btns[i].style.top = (posy * (h + 2)).toString() + "px";
                    this.chord_btns[i].style.width = w.toString() + "px";
                    this.chord_btns[i].style.height = h.toString() + "px";

                    this.chord_btns[i].disabled = true;
                    for (var ind = 0; ind < (this.getCorrectedLevel() >> 1) + 3; ++ind)
                        if (this.isLevelMajor()) {
                            if (ChordSequenceType.major_chords[ind] === i + ChordSequenceType.minmaj_shift)
                                this.chord_btns[i].disabled = false;
                        }
                        else if (ChordSequenceType.minor_chords[ind] === i)
                            this.chord_btns[i].disabled = false;

                    var text = ChordSequenceType.chordName(chn) + "<br>" + Constants.toneNameInKey(ch.root, this.root, this.getCorrectedLevel() % 2 !== 0);

                    if (ch.type === ChordType.min)
                        text += "m";

                    if (ch.type === ChordType.dom7)
                        text += "7";

                    this.chord_btns[i].innerHTML = text;

                    // TODO fix warning
                    var exerciseChords = this;

                    this.chord_btns[i].onmousedown = (function (ii) {
                        return function () {
                            console.log("mouse down" + ii.toString());
                            exerciseChords.buttonDown(ii);
                        }
                    })(i);

                    area.appendChild(this.chord_btns[i]);
                }
            },

            setLevel: function (i_lvl) {
                this.level = i_lvl;
                this.resetButtonLabels();
                exerciseFns.setState(this, exerciseStates.pending);
            },

            newTask: function () {
                this.current_seq = new ChordSequence(this.root, 0, this.getCorrectedLevel());
                this.current_seq.Randomize(4, this.getCorrectedLevel(), this.root);
                this.current_answer = new ChordSequence(this.root, 0, this.getCorrectedLevel());
                this.mistaken = false;
            },

            playTask: function () {
                if (this.state === exerciseStates.pending || this.state === exerciseStates.level_complete || this.state === exerciseStates.game_over) {
                    this.newTask();
                    exerciseFns.setState(this, exerciseStates.waiting);
                }

                this.current_seq.play();
            },

            getNumLevels: function () {
                return ChordSequenceType.num_min_chords + ChordSequenceType.num_maj_chords - 4;
            },

            setRoot: function (i_root) {
                this.root = i_root;
                this.resetButtonLabels();
            },

            getRoot: function () {
                return this.root;
            },

            mouseMove: function (x, y) {
            },

            mouseUp: function (x, y) {
            },

            buttonDown: function (btn) {
                if (ChordSequencePlayer.playing)
                    return;

                var chn = btn;
                if (this.isLevelMajor())
                    chn += ChordSequenceType.minmaj_shift;

                var chrd = ChordSequenceType.createChord(this.current_seq.tone0, chn, this.root);
                chrd.play();

                if (this.state !== exerciseStates.waiting)
                    return;

                ++this.num_tries;

                if (chn !== this.current_seq.sequence[this.current_answer.len()] && !TestingHelper.always_true) {
                    this.correct_in_row[this.level] = 0;
                    this.mistaken = true;
                    this.wrong_chord = chn;
                }
                else {
                    this.current_answer.add(chn);
                    this.wrong_chord = null;
                }

                exerciseFns.setState(this, exerciseStates.waiting);


                if (this.current_answer.len() !== this.current_seq.len())
                    return;

                if (!this.mistaken)
                    ++this.correct_in_row[this.level];

                exerciseFns.updateProgress(this);
                exerciseFns.setState(this, exerciseStates.answered);
                exerciseFns.checkLevelComplete(this);
            },

            mouseDown: function (x, y) {
                this.draw();
            },

            getLevel: function () {
                return this.level;
            },

            getLevelName: function () {
                return "";
            },

            getCorrectInRow: function () {
                return this.correct_in_row[this.level];
            },

            getCorrectNeeded: function () {
                if (TestingHelper.testing)
                    return 1;
                if (this.getLevel() < 5)
                    return 7;
                if (this.getLevel() < 10)
                    return 10;
                if (this.getLevel() < 16)
                    return 15;
                return 10000;
            },

            getCorrectedLevel: function () {
                return Math.min(this.getLevel(), this.getNumLevels() - 1);
            },

            isLevelMajor: function () {
                return (this.getCorrectedLevel() % 2 !== 0);
            },

            extendedName: function (chord) {
                var ch = ChordSequenceType.createChord(12, chord, this.root);
                var text = ChordSequenceType.chordName(chord);
                text += " (" + Constants.toneNameInKey(ch.root, this.root, this.isLevelMajor());

                if (ch.type === ChordType.min)
                    text += "m";

                if (ch.type === ChordType.dom7)
                    text += "7";

                text += ")";

                return text;
            },

            getAnswerText: function () {
                if (this.current_answer.len() === 0)
                    return "";

                var correct_answer = this.current_seq.sequence[this.current_answer.len() - 1];
                var answer = (this.wrong_chord === null) ? this.current_answer.sequence[this.current_answer.len() - 1] : this.wrong_chord;

                return Answers.getShortAnswer(this.extendedName(correct_answer),
                    this.extendedName(answer),
                    this.num_tries + this.current_seq.root);
            },

            getPromptText: function () {
                var text;
                text = "";
                text += ChordSequenceType.chordName(this.current_seq.sequence[0]);

                for (var i = 1; i < this.current_seq.len(); ++i) {
                    if (i < this.current_answer.len())
                        text += " - " + this.extendedName(this.current_seq.sequence[i]);
                    else
                        text += " - ?";
                }

                return text;
            },

            getPendingText: function () {
                return "Press play to hear chord progression.";
            },

            getAnsweredText: function () {
                var text = null;
                if (this.mistaken)
                    text = "There were some mistakes.<br>Press play to hear progression";
                else
                    text = "That was correct.<br>Press play to hear next progression";
                return text;
            },

            getLevelCompleteText: function () {
                var text = ("Level " + (this.level + 1));
                text += "<br>Press play to hear chord progression";

                return text;
            },

            getGameOverText: function () {
                return "Congratulations, great job!<br> It doesn't get any harder than this.";
            },

            draw: function () {
                exerciseFns.updateProgress(this);
                this.resetButtonLabels();
            },

            playOrRepeat: function () {
                return !(this.state === exerciseStates.waiting);
            }
        };

    }
);
