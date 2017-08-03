function sequencePlayChord(chord) {
    chord.play();
}

var ChordSequencePlayer = {
    playing: false,
    sequence: null,

    playSequence: function (i_sequence) {
        if (this.playing)
            return;

        this.sequence = i_sequence.slice();

        this.playing = true;

        var seq = i_sequence.slice();
        var func = function () {
            if (seq.length === 0) return;
            sequencePlayChord(seq[0]);
            seq = seq.slice(1, seq.length);
        };

        for (var i = 0; i < seq.length; ++i) {
            setTimeout(func, i * 611);
        }

        setTimeout(function () {
            ChordSequencePlayer.playing = false;
        }, seq.length * 611);
    }
};
