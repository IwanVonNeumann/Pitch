/**
 * Created by Iwan on 24.08.2017.
 */

define("ExerciseLoader",
    ["$", "Config", "Board", "Exercise", "exerciseStates", "exerciseFns", "exerciseMelody", "exerciseIntervals",
        "exercisePerfect", "exerciseChordProgressions", "exerciseChordTypes"],
    function ($, Config, Board, Exercise, exerciseStates, exerciseFns, exerciseMelody, exerciseIntervals,
              exercisePerfect, exerciseChordProgressions, exerciseChordTypes) {

        var EXERCISE = {};
        EXERCISE[Exercise.MELODY] = exerciseMelody;
        EXERCISE[Exercise.INTERVALS] = exerciseIntervals;
        EXERCISE[Exercise.PERFECT] = exercisePerfect;
        EXERCISE[Exercise.CHORD_PROGRESSIONS] = exerciseChordProgressions;
        EXERCISE[Exercise.CHORD_TYPES] = exerciseChordTypes;


        var $exerciseContainer = $(".exercise-container");

        function playTask() {
            var exercise = Board.exercise;
            // TODO encapsulate to exercise.playTask?
            if (exercise.state === exerciseStates.answered)
                exerciseFns.setState(exercise, exerciseStates.pending);

            exercise.playTask();
        }

        return {
            load: function (name) {
                Config.exercise = name;
                var exercise = EXERCISE[name];
                $exerciseContainer.load(exercise.template, function () {
                    Board.load(exercise);
                    $("#playbtn").unbind("click").click(playTask); // TODO make sure whether unbind needed
                });
            },

            loadMelody: function () {
                this.load(Exercise.MELODY);
            },

            loadIntervals: function () {
                this.load(Exercise.INTERVALS);
            },

            loadPerfect: function () {
                this.load(Exercise.PERFECT);
            },

            loadChordProgressions: function () {
                this.load(Exercise.CHORD_PROGRESSIONS);
            },

            loadChordTypes: function () {
                this.load(Exercise.CHORD_TYPES);
            },

            reload: function () {
                this.load(Config.exercise);
            }
        };
    }
);
