/**
 * Created by Iwan on 29.08.2017.
 */

"use strict";

define("ExerciseMelodyView",
    ["jquery", "underscore", "backbone", "marionette", "text", "text!ExerciseMelodyTemplate",
        "EventBus", "ExerciseMelody", "Config", "Target", "Constants", "InstrumentManager"],
    function ($, _, Backbone, Marionette, text, ExerciseMelodyTemplate,
              EventBus, ExerciseMelody, Config, Target, Constants, InstrumentManager) {

        return Marionette.View.extend({
            initialize: function (options) {
                options = options || {};
                this.exercise = options.exercise;
                this.exercise.instrument = InstrumentManager.getInstrument(Config.instrument);
            },

            tagName: "div",
            className: "exercise",
            template: _.template(ExerciseMelodyTemplate),

            onRender: function () {
                if (Config.target === Target.WEB) {
                    this.setupExerciseForWeb();
                } else if (Config.target === Target.ANDROID) {
                    this.setupExerciseForAndroid();
                }

                this.removeStub();
            },

            onAttach: function () {
                this.removeLoader(); // TODO do this normally

                Constants.init();
                this.exercise.init();
                this.exercise.draw(); // TODO fix: keyboard drawn 3 times
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
                "click #playbtn": "playButtonClicked",
                "mousedown canvas": "mouseDown",
                "mouseup canvas": "mouseUp",
                "touchstart canvas": "touchStart",
                "touchend canvas": "touchEnd"
            },

            playButtonClicked: function () {
                this.exercise.playTask();
            },

            mouseDown: function (e) {
                this.exercise.mouseDown(e.clientX, e.clientY);
            },

            mouseUp: function (e) {
                this.exercise.mouseUp(e.clientX, e.clientY);
            },

            touchStart: function (e) {
                var touchPoint = e.touches[0];
                this.exercise.mouseDown(touchPoint.clientX, touchPoint.clientY);
            },

            touchEnd: function () {
                this.exercise.mouseUp();
            }
        });
    }
);
