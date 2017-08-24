/**
 * Created by Iwan on 24.08.2017.
 */


define("ExerciseLoader",
    ["Board", "exerciseMelody", "exerciseIntervals", "exercisePerfect", "exerciseChords", "exerciseChordTypes"],
    function (Board, exerciseMelody, exerciseIntervals, exercisePerfect, exerciseChords, exerciseChordTypes) {

        return {
            loadMelody: function () {
                Board.load(exerciseMelody);
            },

            loadIntervals: function () {
                Board.load(exerciseIntervals);
            },

            loadPerfect: function () {
                Board.load(exercisePerfect);
            },

            loadChords: function () {
                Board.load(exerciseChords);
            },

            loadChordTypes: function () {
                Board.load(exerciseChordTypes);
            }
        };
    }
);
