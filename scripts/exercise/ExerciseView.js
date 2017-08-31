/**
 * Created by Iwan on 29.08.2017.
 */

"use strict";

define("ExerciseView",
    ["jquery", "underscore", "backbone", "marionette",
        "EventBus", "Config", "Target", "Constants", "InstrumentManager"],
    function ($, _, Backbone, Marionette,
              EventBus, Config, Target, Constants, InstrumentManager) {

        return Marionette.View.extend({
            initialize: function (options) {
                options = options || {};
                this.exercise = options.exercise; // TODO load exercise here?
                this.exercise.instrument = options.instrument; // TODO and instrument?
                this.template = _.template(this.exercise.template);

                EventBus.bind("instrument:set", function (name) {
                    Config.instrument = name;
                    this.exercise.instrument = InstrumentManager.getInstrument(name);
                }, this);
            },

            tagName: "div",
            className: "exercise",

            onRender: function () {
                if (Config.target === Target.WEB) {
                    this.setupExerciseForWeb();
                } else if (Config.target === Target.ANDROID) {
                    this.setupExerciseForAndroid();
                }
            },

            onAttach: function () {
                this.setupCanvas();
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
                this.$el.find(".upper").css({borderRadius: "0"});
                this.$el.find(".playbtn").css({borderRadius: "0"});
            },

            setupCanvas: function () {
                var $exercise = this.$el[0];
                var $canvas = this.$el.find("#canvas");

                if ($canvas.length) {
                    $canvas.attr({
                        width: $exercise.clientWidth,
                        height: Math.floor($exercise.clientHeight * 0.5)
                    });
                } else { // TODO make sure whether this is actually needed
                    Constants.scr_w = $exercise.clientWidth;
                    Constants.scr_h = $exercise.clientHeight;
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
