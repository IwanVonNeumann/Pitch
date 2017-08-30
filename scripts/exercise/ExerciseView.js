/**
 * Created by Iwan on 29.08.2017.
 */

"use strict";

define("ExerciseView",
    ["jquery", "underscore", "backbone", "marionette",
        "Config", "Target", "Constants"],
    function ($, _, Backbone, Marionette,
              Config, Target, Constants) {

        return Marionette.View.extend({
            tagName: "div",
            className: "exercise",

            onRender: function () {
                if (Config.target === Target.WEB) {
                    this.setupExerciseForWeb();
                } else if (Config.target === Target.ANDROID) {
                    this.setupExerciseForAndroid();
                }

                this.removeStub();
            },

            setupExerciseForWeb: function () {
                this.$el.css({height: "320px"});
            },

            setupExerciseForAndroid: function () {
                //for the mobile apps the height must be fullscreen
                this.$el.css({
                    width: "100%",
                    borderRadius: "0"
                });
                this.$el.find(".upper").css({borderRadius: '0'});
                this.$el.find(".playbtn").css({borderRadius: '0'});
            },

            removeStub: function () {
                this.$el.find(".stub").remove();
            },

            displayProgress: function (percent) {
                this.$el.find(".loader").text("Loading " + percent.toString() + "%");
            },

            // TODO refactor using jQuery
            removeLoader: function () {
                var exercise = (document.getElementsByClassName("exercise"))[0];

                var loader = (document.getElementsByClassName("loader"));
                if (loader.length > 0) {
                    loader = loader[0];
                    exercise.removeChild(loader);
                }

                var canvas = document.getElementById("canvas");
                if (canvas !== null) {
                    canvas.width = exercise.clientWidth;
                    canvas.height = Math.floor(exercise.clientHeight * 0.5);
                } else {
                    Constants.scr_w = exercise.clientWidth;
                    Constants.scr_h = exercise.clientHeight;
                }
            },

            events: {
                "click #playbtn": "playButtonClicked"
            },

            playButtonClicked: function () {
                this.exercise.playTask();
            }
        });
    }
);
