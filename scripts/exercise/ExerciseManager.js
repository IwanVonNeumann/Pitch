/**
 * Created by Iwan on 26.08.2017.
 */

define("ExerciseManager",
    ["Exercise", "ExerciseMelody", "ExerciseIntervals", "ExercisePerfect", "ExerciseChordProgressions",
        "ExerciseChordTypes"],
    function (Exercise, exerciseMelody, exerciseIntervals, exercisePerfect, exerciseChordProgressions,
              exerciseChordTypes) {

        var EXERCISE = {};
        EXERCISE[Exercise.MELODY] = exerciseMelody;
        EXERCISE[Exercise.INTERVALS] = exerciseIntervals;
        EXERCISE[Exercise.PERFECT] = exercisePerfect;
        EXERCISE[Exercise.CHORD_PROGRESSIONS] = exerciseChordProgressions;
        EXERCISE[Exercise.CHORD_TYPES] = exerciseChordTypes;

        return {
            getExercise: function (name) {
                return EXERCISE[name];
            }
        };
    }
);