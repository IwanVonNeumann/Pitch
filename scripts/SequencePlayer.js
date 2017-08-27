"use strict";

define("SequencePlayer", ["Config", "Instrument"], function (Config, Instrument) {

    var SequencePlayer = function (instrument) {
        this.playing = false;
        this.sequence = null;
        this.instrument = instrument;
    };

    var NOTE_LENGTH = {};
    NOTE_LENGTH[Instrument.PIANO] = 611;
    NOTE_LENGTH[Instrument.GUITAR] = 611;
    NOTE_LENGTH[Instrument.VIOLIN] = 950;

    // TODO cleancode this))
    SequencePlayer.prototype.playSequence = function (sequenceObject) {
        if (this.playing)
            return;

        var sequence = sequenceObject.sequence; // yes =(

        this.sequence = sequence.slice();
        this.playing = true;

        var instrument = this.instrument;

        var seq = sequence.slice();

        var func = function () {
            if (seq.length === 0) return;
            instrument.playNote(seq[0]);
            seq = seq.slice(1, seq.length);
        };

        var noteLength = NOTE_LENGTH[Config.instrument];

        for (var i = 0; i < this.sequence.length; i++) {
            //var tone = this.sequence[i];
            setTimeout(func, i * noteLength);
        }

        var SequencePlayer = this;
        setTimeout(function () {
            SequencePlayer.playing = false;
        }, sequence.length * noteLength);
    };

    return SequencePlayer;
});
