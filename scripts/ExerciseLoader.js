/**
 * Created by Iwan on 24.08.2017.
 */


define("ExerciseLoader",
    ["$", "Board", "Exercise", "exerciseStates", "exerciseFns", "exerciseMelody", "exerciseIntervals",
        "exercisePerfect", "ExerciseChordProgressions", "exerciseChordTypes"],
    function ($, Board, Exercise, exerciseStates, exerciseFns, exerciseMelody, exerciseIntervals,
              exercisePerfect, ExerciseChordProgressions, exerciseChordTypes) {

        var $exerciseContainer = $(".exercises-container");

        function play() {
            var exercise = Board.exercise;
            // TODO encapsulate to exercise.playTask?
            if (exercise.state === exerciseStates.answered)
                exerciseFns.setState(exercise, exerciseStates.pending);

            exercise.playTask();
        }

        return {
            loadMelody: function () {
                $exerciseContainer.load("ex_Melody.html", function () {
                    Board.load(exerciseMelody);
                    $("#playbtn").unbind("click").click(play); // TODO review whether unbind needed
                });
            },

            loadIntervals: function () {
                $exerciseContainer.load("ex_Intervals.html", function () {
                    Board.load(exerciseIntervals);
                    $("#playbtn").unbind("click").click(play);
                });
            },

            loadPerfect: function () {
                $exerciseContainer.load("ex_Perfect.html", function () {
                    Board.load(exercisePerfect);
                    $("#playbtn").unbind("click").click(play);
                });
            },

            loadChords: function () {
                $exerciseContainer.load("ex_ChordProgressions.html", function () {
                    Board.load(ExerciseChordProgressions);
                    $("#playbtn").unbind("click").click(play);
                });
            },

            loadChordTypes: function () {
                $exerciseContainer.load("ex_ChordTypes.html", function () {
                    Board.load(exerciseChordTypes);
                    $("#playbtn").unbind("click").click(play);
                });
            }

            /*
            load: function (name) {
                var EXERCISE_LOADERS = {};
                EXERCISE_LOADERS[Exercise.MELODY] = this.loadMelody;
                EXERCISE_LOADERS[Exercise.INTERVALS] = this.loadIntervals;
                EXERCISE_LOADERS[Exercise.PERFECT] = this.loadPerfect;
                EXERCISE_LOADERS[Exercise.CHORD_PROGRESSIONS] = this.loadChords;
                EXERCISE_LOADERS[Exercise.CHORD_TYPES] = this.loadChordTypes;

                var loadExercise = EXERCISE_LOADERS[name];
                loadExercise();
            }
            */
        };
    }
);
