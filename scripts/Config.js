define("Config", ["Target", "Instrument", "Exercise"], function (Target, Instrument, Exercise) {

    var config = {
        instrument: Instrument.PIANO,
        exercise: Exercise.MELODY
    };

    if ('undefined' !== typeof SoundManagerAndroid) {
        config.target = Target.ANDROID;
    } else {
        config.target = Target.WEB;
    }

    return config;
});
