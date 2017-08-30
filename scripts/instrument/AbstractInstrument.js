/**
 * Created by Iwan on 27.08.2017.
 */

"use strict";

define("AbstractInstrument", ["SequencePlayer"], function (SequencePlayer) {

    var AbstractInstrument = function () {
        this.sequencePlayer = new SequencePlayer(this);
    };

    AbstractInstrument.prototype.playNote = function (note, volume) {
        volume = volume || 1.0;
        var sound = this.notes[note];
        sound.pause(); // is this needed?
        sound.volume = volume;
        sound.currentTime = 0;
        sound.play();
    };

    AbstractInstrument.prototype.playChord = function (chord) {
        // TODO implement
    };

    AbstractInstrument.prototype.playInterval = function (interval) {
        // TODO implement
    };

    AbstractInstrument.prototype.playSequence = function (sequence) {
        this.sequencePlayer.playSequence(sequence)
    };

    return AbstractInstrument;
});
