/**
 * Created by Iwan on 29.08.2017.
 */

"use strict";

define("GameView",
    ["jquery", "underscore", "backbone", "marionette", "text", "text!GameTemplate",
        "EventBus", "ExerciseMenuView", "InstrumentMenuView", "ExerciseView", "Config", "Target", "Constants",
        "ExerciseMelody", "ExerciseManager", "InstrumentManager"],
    function ($, _, Backbone, Marionette, text, GameTemplate,
              EventBus, ExerciseMenuView, InstrumentMenuView, ExerciseView, Config, Target, Constants,
              ExerciseMelody, ExerciseManager, InstrumentManager) {

        return Marionette.View.extend({
            initialize: function () {
                EventBus.bind("exercise:set", function (name) {
                    Config.exercise = name;
                    this.loadExercise()
                }, this);
            },

            tagName: "div",
            className: "game-container",
            template: _.template(GameTemplate),

            regions: {
                exerciseMenuRegion: '#exercise-menu',
                instrumentMenuRegion: '#instrument-menu',
                exerciseRegion: "#exercise-container"
            },

            onRender: function () {
                this.showChildView("exerciseMenuRegion", new ExerciseMenuView());
                this.showChildView("instrumentMenuRegion", new InstrumentMenuView());
                this.loadExercise();
            },

            onAttach: function () {
                this.bindEventListeners();
            },

            loadExercise: function () {
                this.showChildView("exerciseRegion", new ExerciseView({
                    exercise: ExerciseManager.getExercise(Config.exercise),
                    instrument: InstrumentManager.getInstrument(Config.instrument)
                }));
            },

            bindEventListeners: function () {
                // TODO go somewhere else with window events
                window.onselectstart = function () {
                    return false;
                };

                // var game = this.game;

                if (Config.target === Target.WEB) {
                    window.onresize = function () {

                        var canvas = document.getElementById("canvas");
                        var exercise = (document.getElementsByClassName("exercise"))[0];
                        if (canvas) {
                            canvas.width = exercise.clientWidth;
                            canvas.height = Math.floor(exercise.clientHeight * 0.5);
                            canvas.style.width = exercise.clientWidth;
                            canvas.style.height = Math.floor(exercise.clientHeight * 0.5);

                            // TODO write screen dimensions to Config!
                            Constants.scr_w = canvas.clientWidth;
                            Constants.scr_h = canvas.clientHeight;
                        } else {
                            Constants.scr_w = exercise.clientWidth;
                            Constants.scr_h = exercise.clientHeight;
                        }

                        /*
                        // TODO repaint exercise!!!
                        if (game.exercise)
                             game.exercise.draw();
                             */
                    };
                }
            }
        });
    }
);
