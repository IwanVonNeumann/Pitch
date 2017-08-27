define("Interval", ["Constants", "RandomUtil", "SoundManager"], function (Constants, SoundManager, RandomUtil) {

    var Interval = function () {
        this.tone0 = 0;
        this.diff = 0;
    };

    function intervalPlaySound(tone) {
        SoundManager.playSound(tone);
    }

    Interval.prototype = {

        equal: function (other) {
            return (this.tone0 === other.tone0 && this.diff === other.diff);
        },


        play: function () {
            intervalPlaySound(this.tone0);
            var tone1 = this.tone0 + this.diff;
            setTimeout(function () {
                intervalPlaySound(tone1)
            }, 1000);
        },

        randomOfTwo: function (diff0, diff1) {
            var tone_ind = RandomUtil.getMod(2);

            if (tone_ind === 0)
                this.diff = diff0;
            else
                this.diff = diff1;

            if (RandomUtil.getNormalised() > 0.5)
                this.diff = -this.diff;


            this.tone0 = RandomUtil.getMod(Constants.num_tones_in_octave);
            var octave_ind = RandomUtil.getMod(Constants.num_octaves);
            this.tone0 += octave_ind * Constants.num_tones_in_octave;

            while (this.tone0 + this.diff < 0 || this.tone0 + this.diff >= Constants.num_tones_in_octave * Constants.num_octaves || this.tone0 === IntervalHelperStatic.prev_tone0) {
                this.tone0 = RandomUtil.getMod(Constants.num_tones_in_octave);
                octave_ind = RandomUtil.getMod(Constants.num_octaves);
                this.tone0 += octave_ind * Constants.num_tones_in_octave;
            }

            IntervalHelperStatic.prev_tone0 = this.tone0;
        },

        randomInterval: function (level) {
            this.diff = 0;

            var num_intervals = Math.min(level + 2, Constants.intervals.length);
            var interval_ind = RandomUtil.getMod(num_intervals);
            this.diff = Constants.intervals[interval_ind];
            if (RandomUtil.getNormalised() > 0.5)
                this.diff = -this.diff;

            this.tone0 = RandomUtil.getMod(Constants.num_tones_in_octave);
            var octave_ind = RandomUtil.getMod(Constants.num_octaves);
            this.tone0 += octave_ind * Constants.num_tones_in_octave;

            while (this.tone0 + this.diff < 0 || this.tone0 + this.diff >= Constants.num_tones_in_octave * Constants.num_octaves || this.tone0 === IntervalHelperStatic.prev_tone0) {
                this.tone0 = RandomUtil.getMod(Constants.num_tones_in_octave);
                octave_ind = RandomUtil.getMod(Constants.num_octaves);
                this.tone0 += octave_ind * Constants.num_tones_in_octave;
            }

            IntervalHelperStatic.prev_tone0 = this.tone0;
        },

        toString: function () {
            var s0 = Constants.tone_names[this.tone0 % Constants.num_tones_in_octave];
            var s1 = Constants.tone_names[(this.tone0 + this.diff) % Constants.num_tones_in_octave];

            var abdsdiff = Math.abs(this.diff);

            var s2 = Constants.interval_names[abdsdiff];

            return (s0 + "-" + s1 + " (" + s2 + ")");
        },

        shortName: function () {
            var abdsdiff = Math.abs(this.diff);
            return Constants.interval_names[abdsdiff];
        }
    };

    var IntervalHelperStatic = {
        prev_tone0: 0
    };

    return Interval;
});
