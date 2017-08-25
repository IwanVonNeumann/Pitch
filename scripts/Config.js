define("Config", ["Target", "Instrument", "Exercise"], function (Target, Instrument, Exercise) {

    return {
        target: Target.WEB, // TODO autodetect
        instrument: Instrument.PIANO,
        exercise: Exercise.MELODY
    };
});
