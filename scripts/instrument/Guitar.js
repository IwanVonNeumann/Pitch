/**
 * Created by Iwan on 27.08.2017.
 */

define("Guitar",
    ["AbstractInstrument", "Instrument", "SoundManager"],
    function (AbstractInstrument, Instrument, SoundManager) {

        var Guitar = function () {
            AbstractInstrument.apply(this, arguments);
            this.notes = SoundManager.loadSounds(Instrument.GUITAR);
        };

        Guitar.prototype.__proto__ = AbstractInstrument.prototype;

        var singletonGuitar;

        return {
            get: function () {
                singletonGuitar = singletonGuitar || new Guitar();
                return singletonGuitar;
            }
        };
    }
);
