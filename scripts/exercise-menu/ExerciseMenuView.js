/**
 * Created by Iwan on 29.08.2017.
 */

"use strict";

define("ExerciseMenuView",
    ["jquery", "underscore", "backbone", "marionette",
        "text", "text!ExerciseMenuTemplate", "EventBus", "Config", "Exercise"],
    function ($, _, Backbone, Marionette, text, ExerciseMenuTemplate, EventBus, Config, Exercise) {

        return Marionette.View.extend({

            initialize: function () {
                EventBus.bind("exercise:set", function (name) {
                    this.selectExercise(name);
                }, this);
            },

            tagName: "ul",
            className: "exercise-menu",
            template: _.template(ExerciseMenuTemplate),

            onRender: function () {
                this.selectExercise(Config.exercise);
            },

            events: {
                "click .js-select-ex-melody": "selectExMelodyClick",
                "click .js-select-ex-relative": "selectExIntervalsClick",
                "click .js-select-ex-perfect": "selectExPerfectClick",
                "click .js-select-ex-progressions": "selectExChordProgressionsClick",
                "click .js-select-ex-chords": "selectExChordTypesClick"
            },

            selectExMelodyClick: function () {
                EventBus.trigger("exercise:set", Exercise.MELODY);
            },

            selectExIntervalsClick: function () {
                EventBus.trigger("exercise:set", Exercise.INTERVALS);
            },

            selectExPerfectClick: function () {
                EventBus.trigger("exercise:set", Exercise.PERFECT);
            },

            selectExChordProgressionsClick: function () {
                EventBus.trigger("exercise:set", Exercise.CHORD_PROGRESSIONS);
            },

            selectExChordTypesClick: function () {
                EventBus.trigger("exercise:set", Exercise.CHORD_TYPES);
            },

            selectExercise: function (name) {
                this.deselectAllExercises();

                var $EXERCISE_BUTTON = {};
                $EXERCISE_BUTTON[Exercise.MELODY] = ".js-select-ex-melody";
                $EXERCISE_BUTTON[Exercise.INTERVALS] = ".js-select-ex-relative";
                $EXERCISE_BUTTON[Exercise.PERFECT] = ".js-select-ex-perfect";
                $EXERCISE_BUTTON[Exercise.CHORD_PROGRESSIONS] = ".js-select-ex-progressions";
                $EXERCISE_BUTTON[Exercise.CHORD_TYPES] = ".js-select-ex-chords";

                var exerciseButton = $EXERCISE_BUTTON[name];

                this.$el.find(exerciseButton).addClass("selected");
            },

            deselectAllExercises: function () {
                $(".js-select-ex").removeClass("selected");
            }
        });
    }
);
