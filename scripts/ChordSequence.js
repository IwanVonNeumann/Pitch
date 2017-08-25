define("ChordSequence", ["Constants", "RandomUtil", "ChordSequenceType", "ChordSequencePlayer"],
    function (Constants, RandomUtil, ChordSequenceType, ChordSequencePlayer) {

        var ChordSequence = function (i_root, len, level) {
        this.root = i_root;
        this.tone0 = 12;

        this.sequence = [];

        // for (var i = 0; i < len; ++i)
        // {
        //   this.sequence.push(i, ChordSequenceType.randomChord(level, i));

        //   if ( i > 0 )
        //     while (this.sequence[i] == this.sequence[i - 1])
        //            this.sequence[i] = ChordSequenceType.randomChord(level, i);
        // }
    };

    ChordSequence.prototype = {

        add: function (ch) {
            this.sequence.push(ch);
        },

        setRoot: function (newroot) {
            this.root = newroot;
        },

        Randomize: function (len, level, root) {
            this.tone0 = RandomUtil.getMod(12) + 6;
            this.sequence = [];

            for (var i = 0; i < len; ++i) {
                this.sequence.push(ChordSequenceType.randomChord(level, i));

                if (i > 0)
                    while (this.sequence[i] === this.sequence[i - 1])
                        this.sequence[i] = ChordSequenceType.randomChord(level, i);
            }

        },


        ith: function (i) {
            return this.sequence[i];
        },

        len: function () {
            return this.sequence.length;
        },

        play: function () {
            if (ChordSequencePlayer.playing)
                return;

            var chords = [];
            for (var i = 0; i < this.sequence.length; ++i)
                chords.push(ChordSequenceType.createChord(this.tone0, this.sequence[i], this.root));

            ChordSequencePlayer.playSequence(chords);
            // if (ChordSequencePlayer.playing)
            //   return;
            // ChordSequencePlayer.playing = true;

            // var chord = ChordSequenceType.createChord(this.tone0, this.sequence[0], this.root);
            // chord.play();


            // var sc = new ChordSequencePlayer(context, chords, 1);
            // var h = new Handler();
            // h.removeCallbacks(sc);
            // h.postDelayed(sc, 611);
        }
    };

    return ChordSequence;
});
