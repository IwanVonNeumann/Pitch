/**
 * Created by Iwan on 25.08.2017.
 */

define("Instrument", function () {
    return {
        PIANO: "PIANO",
        GUITAR: "GUITAR",
        VIOLIN: "VIOLIN"
    };
});

define("Target", function () {
    return {
        WEB: "WEB",
        ANDROID: "ANDROID"
    };
});

define("Exercise", function () {
    return {
        MELODY: "MELODY",
        INTERVALS: "INTERVALS",
        PERFECT: "PERFECT",
        CHORD_PROGRESSIONS: "CHORD_PROGRESSIONS",
        CHORD_TYPES: "CHORD_TYPES"
    };
});

define("ExerciseState", function () {
    return {
        PENDING: "PENDING",
        WAITING: "WAITING",
        WAITING_0: "WAITING_0",
        WAITING_1: "WAITING_1",
        ANSWERED: "ANSWERED",
        LEVEL_COMPLETED: "LEVEL_COMPLETED",
        GAME_OVER: "GAME_OVER"
    };
});
