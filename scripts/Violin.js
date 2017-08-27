/**
 * Created by Iwan on 27.08.2017.
 */

define("Violin",
    ["AbstractInstrument", "Instrument", "SoundManager"],
    function (AbstractInstrument, Instrument, SoundManager) {

        var Violin = function () {
            AbstractInstrument.apply(this, arguments);
            this.notes = SoundManager.loadSounds(Instrument.VIOLIN);
        };

        Violin.prototype.__proto__ = AbstractInstrument.prototype;

        var singletonViolin;

        return {
            get: function () {
                singletonViolin = singletonViolin || new Violin();
                return singletonViolin;
            }
        };
    }
);
