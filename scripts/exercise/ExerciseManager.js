/**
 * Created by Iwan on 26.08.2017.
 */

define("ExerciseManager",
    ["Exercise", "ExerciseMelody", "ExerciseIntervals", "ExercisePerfect", "ExerciseChordProgressions",
        "ExerciseChordTypes"],
    function (Exercise, ExerciseMelody, ExerciseIntervals, ExercisePerfect, ExerciseChordProgressions,
              ExerciseChordTypes) {

        var EXERCISE = {};
        EXERCISE[Exercise.MELODY] = ExerciseMelody;
        EXERCISE[Exercise.INTERVALS] = ExerciseIntervals;
        EXERCISE[Exercise.PERFECT] = ExercisePerfect;
        EXERCISE[Exercise.CHORD_PROGRESSIONS] = ExerciseChordProgressions;
        EXERCISE[Exercise.CHORD_TYPES] = ExerciseChordTypes;

        return {
            getExercise: function (name) {
                return EXERCISE[name];
            }
        };
    }
);
