/**
 * Created by Iwan on 29.08.2017.
 */

"use strict";

define("GameView",
    ["jquery", "underscore", "backbone", "marionette", "text", "text!GameTemplate",
        "ExerciseMenuView", "InstrumentMenuView", "ExerciseView", "Config", "Target", "Constants",
        "ExerciseMelody", "InstrumentManager"],
    function ($, _, Backbone, Marionette, text, GameTemplate,
              ExerciseMenuView, InstrumentMenuView, ExerciseView, Config, Target, Constants,
              ExerciseMelody, InstrumentManager) {

        return Marionette.View.extend({
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

                this.showChildView("exerciseRegion", new ExerciseView({
                    exercise: ExerciseMelody,
                    instrument: InstrumentManager.getInstrument(Config.instrument)
                }));

                // TODO verify whether this placing is correct
                // EventBus.trigger("instrument:set", Config.instrument);
                // EventBus.trigger("exercise:set", Config.exercise);
            },

            onAttach: function () {
                this.bindEventListeners();
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
