define("SequencePlayer", ["Config", "Instrument", "SoundManager"], function (Config, Instrument, SoundManager) {

    return {
        playing: false,
        sequence: null,

        playSequence: function (sequence) {
            if (this.playing)
                return;

            this.sequence = sequence.slice();

            this.playing = true;

            //sequencePlaySound(sequence[0]);

            var seq = sequence.slice();
            var func = function () {
                if (seq.length === 0) return;
                SoundManager.playSound(seq[0]);
                seq = seq.slice(1, seq.length);
            };

            var noteLength = this.countNoteLength();

            for (var i = 0; i < this.sequence.length; i++) {
                //var tone = this.sequence[i];
                setTimeout(func, i * noteLength);
            }

            var SequencePlayer = this;
            setTimeout(function () {
                SequencePlayer.playing = false;
            }, sequence.length * noteLength);
        },

        countNoteLength: function () {
            var NOTE_LENGTH = {};
            NOTE_LENGTH[Instrument.PIANO] = 611;
            NOTE_LENGTH[Instrument.GUITAR] = 611;
            NOTE_LENGTH[Instrument.VIOLIN] = 950;

            return NOTE_LENGTH[Config.instrument];
        }
    };
});
