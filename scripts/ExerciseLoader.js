/**
 * Created by Iwan on 24.08.2017.
 */


define("ExerciseLoader",
    ["$", "Board", "exerciseStates", "exerciseFns", "exerciseMelody", "exerciseIntervals", "exercisePerfect",
        "exerciseChords", "exerciseChordTypes"],
    function ($, Board, exerciseStates, exerciseFns, exerciseMelody, exerciseIntervals, exercisePerfect,
              exerciseChords, exerciseChordTypes) {

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
                $exerciseContainer.load("ex_Relative.html", function () {
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
                $exerciseContainer.load("ex_Progressions.html", function () {
                    Board.load(exerciseChords);
                    $("#playbtn").unbind("click").click(play);
                });
            },

            loadChordTypes: function () {
                $exerciseContainer.load("ex_Chords.html", function () {
                    Board.load(exerciseChordTypes);
                    $("#playbtn").unbind("click").click(play);
                });
            }
        };
    }
);
