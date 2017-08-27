/**
 * Created by Iwan on 27.08.2017.
 */

"use strict";

define("InstrumentManager",
    ["Instrument", "Piano", "Guitar", "Violin"],
    function (Instrument, Piano, Guitar, Violin) {

        var INSTRUMENT = {};
        INSTRUMENT[Instrument.PIANO] = Piano;
        INSTRUMENT[Instrument.GUITAR] = Guitar;
        INSTRUMENT[Instrument.VIOLIN] = Violin;

        return {
            getInstrument: function (name) {
                return INSTRUMENT[name].get();
            }
        };
    }
);
