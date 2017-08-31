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
                this.exercise.view = this;
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

                this.updateKey();
                this.updateLevel();
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
                "touchend canvas": "touchEnd",
                "click #leveldec": "decreaseLevel",
                "click #levelinc": "increaseLevel",
                "click #keydec": "decreaseKey",
                "click #keyinc": "increaseKey"
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
            },

            decreaseLevel: function () {
                this.updateLevel();
                this.exercise.setLevel((this.exercise.getLevel() + this.exercise.getNumLevels() - 1) % this.exercise.getNumLevels());
                this.exercise.draw();
            },

            increaseLevel: function () {
                this.updateLevel();
                this.exercise.setLevel((this.exercise.getLevel() + 1) % this.exercise.getNumLevels());
                this.exercise.draw();
            },

            updateLevel: function () {
                this.$el.find("#levelname").text(this.exercise.getLevelName());
                this.$el.find("#levelselectorvalue").text(this.exercise.getLevel() + 1);
            },

            decreaseKey: function () {
                this.exercise.setRoot((this.exercise.getRoot() + Constants.tone_names.length - 1) % Constants.tone_names.length);
                this.exercise.draw();
                this.updateKey();
            },

            increaseKey: function () {
                this.exercise.setRoot((this.exercise.getRoot() + 1) % Constants.tone_names.length);
                this.exercise.draw();
                this.updateKey();
            },

            updateKey: function () {
                this.$el.find("#keyselectorvalue").text(Constants.tone_names[this.exercise.getRoot()]);
            },

            enableKeySelection: function (enable) {
                this.$el.find("#keyinc, #keydec").attr({
                   disabled: !enable
                });
            },

            enableLevelSelection: function (enable) {
                this.$el.find("#levelinc, #leveldec").attr({
                    disabled: !enable
                });
            }
        });
    }
);
