/**
 * Created by Iwan on 09.08.2017.
 */

"use strict";

define(
    "GameUI",
    ["$", "EventBus", "Config", "Constants", "Target", "Exercise", "Instrument"],
    function ($, EventBus, Config, Constants, Target, Exercise, Instrument) {

        var $selectExMelody;
        var $selectExRelative;
        var $selectExPerfect;
        var $selectExProgressions;
        var $selectExChords;

        var $selectInsPiano;
        var $selectInsGuitar;
        var $selectInsViolin;

        var $EXERCISE_BUTTON = {};
        var $INSTRUMENT_BUTTON = {};


        var GameUI = function (game) {
            this.game = game;

            var gameUI = this;

            $(document).ready(function () {
                gameUI.initSelectors();
                gameUI.bindEventListeners();

                EventBus.trigger("instrument:set", Config.instrument);
                EventBus.trigger("exercise:set", Config.exercise);
            });
        };

        GameUI.prototype.initSelectors = function () {
            $EXERCISE_BUTTON[Exercise.MELODY] = $selectExMelody = $(".js-select-ex-melody");
            $EXERCISE_BUTTON[Exercise.INTERVALS] = $selectExRelative = $(".js-select-ex-relative");
            $EXERCISE_BUTTON[Exercise.PERFECT] = $selectExPerfect = $(".js-select-ex-perfect");
            $EXERCISE_BUTTON[Exercise.CHORD_PROGRESSIONS] = $selectExProgressions = $(".js-select-ex-progressions");
            $EXERCISE_BUTTON[Exercise.CHORD_TYPES] = $selectExChords = $(".js-select-ex-chords");

            $INSTRUMENT_BUTTON[Instrument.PIANO] = $selectInsPiano = $(".js-select-ins-piano");
            $INSTRUMENT_BUTTON[Instrument.GUITAR] = $selectInsGuitar = $(".js-select-ins-guitar");
            $INSTRUMENT_BUTTON[Instrument.VIOLIN] = $selectInsViolin = $(".js-select-ins-violin");
        };

        GameUI.prototype.bindEventListeners = function () {
            $selectExMelody.click(function () {
                EventBus.trigger("exercise:set", Exercise.MELODY);
            });
            $selectExRelative.click(function () {
                EventBus.trigger("exercise:set", Exercise.INTERVALS);
            });
            $selectExPerfect.click(function () {
                EventBus.trigger("exercise:set", Exercise.PERFECT);
            });
            $selectExProgressions.click(function () {
                EventBus.trigger("exercise:set", Exercise.CHORD_PROGRESSIONS);
            });
            $selectExChords.click(function () {
                EventBus.trigger("exercise:set", Exercise.CHORD_TYPES);
            });

            $selectInsPiano.click(function () {
                EventBus.trigger("instrument:set", Instrument.PIANO);
            });
            $selectInsGuitar.click(function () {
                EventBus.trigger("instrument:set", Instrument.GUITAR);
            });
            $selectInsViolin.click(function () {
                EventBus.trigger("instrument:set", Instrument.VIOLIN);
            });


            EventBus.bind("exercise:set", function (name) {
                this.selectExercise(name);
            }, this);

            EventBus.bind("instrument:set", function (name) {
                this.selectInstrument(name);
            }, this);


            var $document = $(document);

            if (Config.target === Target.WEB) {
                $document.mousedown(function (e) {
                    EventBus.trigger("exercise:mousedown", e);
                });
                $document.mouseup(function (e) {
                    EventBus.trigger("exercise:mouseup", e);
                });

            } else if (Config.target === Target.ANDROID) {
                $document.on("touchstart", function (e) {
                    EventBus.trigger("exercise:touchdown", e);
                });
                $document("touchend", function () {
                    EventBus.trigger("exercise:touchup");
                });
            }

            window.onselectstart = function () {
                return false;
            };

            var game = this.game;

            if (Config.target === Target.WEB)
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

                    if (game.exercise)
                        game.exercise.draw();
                };
        };

        GameUI.prototype.setupExercise = function () {
            if (Config.target === Target.WEB) {
                this.setupExerciseForWeb();
            } else if (Config.target === Target.ANDROID) {
                this.setupExerciseForAndroid();
            }

            this.removeStub();
        };

        GameUI.prototype.setupExerciseForWeb = function () {
            $(".exercise").css({height: "320px"});
        };

        GameUI.prototype.setupExerciseForAndroid = function () {
            //for the mobile apps the height must be fullscreen
            $(".exercise").css({
                width: "100%",
                borderRadius: "0"
            });
            $(".upper").css({borderRadius: '0'});
            $(".playbtn").css({borderRadius: '0'});
        };

        GameUI.prototype.removeStub = function () {
            $(".exercise").find(".stub").remove();
        };

        GameUI.prototype.displayProgress = function (percent) {
            $(".loader").text("Loading " + percent.toString() + "%");
        };

        // TODO refactor using jQuery
        GameUI.prototype.removeLoader = function () {
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
        };

        GameUI.prototype.bindPlayButtonEvent = function () {
            // TODO make sure whether unbind needed
            var game = this.game;
            $("#playbtn").unbind("click").click(function () {
                game.exercise.playTask();
            });
        };

        GameUI.prototype.selectExercise = function (name) {
            this.deselectAllExercises();
            $EXERCISE_BUTTON[name].addClass("selected");
        };

        GameUI.prototype.deselectAllExercises = function () {
            $(".js-select-ex").removeClass("selected");
        };

        GameUI.prototype.selectInstrument = function (name) {
            this.deselectAllInstruments();
            $INSTRUMENT_BUTTON[name].addClass("selected");
        };

        GameUI.prototype.deselectAllInstruments = function () {
            $(".js-select-ins").removeClass("selected");
        };

        return GameUI;
    }
);
