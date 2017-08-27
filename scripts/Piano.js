/**
 * Created by Iwan on 27.08.2017.
 */

"use strict";

define("Piano",
    ["AbstractInstrument", "Instrument", "SoundManager"],
    function (AbstractInstrument, Instrument, SoundManager) {

        var Piano = function () {
            AbstractInstrument.apply(this, arguments);
            this.notes = SoundManager.loadSounds(Instrument.PIANO);
        };

        Piano.prototype.__proto__ = AbstractInstrument.prototype;

        var singletonPiano;

        return {
            get: function () {
                singletonPiano = singletonPiano || new Piano();
                return singletonPiano;
            }
        };
    }
);
