/**
 * Created by Iwan on 09.08.2017.
 */

"use strict";

define("GameUI", ["$", "Config", "Constants", "Target"], function ($, Config, Constants, Target) {

    var $selectExMelody;
    var $selectExRelative;
    var $selectExPerfect;
    var $selectExProgressions;
    var $selectExChords;

    var $selectInsPiano;
    var $selectInsGuitar;
    var $selectInsViolin;


    var GameUI = function (game) {
        this.game = game;

        var gameUI = this;

        $(document).ready(function () {
            gameUI.initSelectors();
            gameUI.bindEventListeners();

            // TODO read config!!!
            gameUI.selectExMelody();
            gameUI.selectInsViolin();
        });
    };

    GameUI.prototype.initSelectors = function () {
        $selectExMelody = $(".js-select-ex-melody");
        $selectExRelative = $(".js-select-ex-relative");
        $selectExPerfect = $(".js-select-ex-perfect");
        $selectExProgressions = $(".js-select-ex-progressions");
        $selectExChords = $(".js-select-ex-chords");

        $selectInsPiano = $(".js-select-ins-piano");
        $selectInsGuitar = $(".js-select-ins-guitar");
        $selectInsViolin = $(".js-select-ins-violin");
    };

    GameUI.prototype.bindEventListeners = function () {
        $selectExMelody.click(this.selectExMelody);
        $selectExRelative.click(this.selectExRelative);
        $selectExPerfect.click(this.selectExPerfect);
        $selectExProgressions.click(this.selectExProgressions);
        $selectExChords.click(this.selectExChords);

        $selectInsPiano.click(this.selectInsPiano);
        $selectInsGuitar.click(this.selectInsGuitar);
        $selectInsViolin.click(this.selectInsViolin);

        var game = this.game;

        function touchDown(e) {
            var ev = e.touches[0];
            game.exercise.mouseDown(ev.clientX, ev.clientY);
        }

        function touchUp() {
            game.exercise.mouseUp();
        }

        function mouseDown(e) {
            game.exercise.mouseDown(e.clientX, e.clientY);
        }

        function mouseUp(e) {
            game.exercise.mouseUp(e.clientX, e.clientY);
        }

        if (Config.target === Target.WEB) {
            document.onmousedown = mouseDown;
            document.onmouseup = mouseUp;
        } else if (Config.target === Target.ANDROID) {
            document.ontouchstart = touchDown;
            document.ontouchend = touchUp;
        }

        window.onselectstart = function () {
            return false;
        };

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

    GameUI.prototype.selectExMelody = function () {
        this.deselectAllExercises();
        $selectExMelody.addClass("selected");
        this.game.loadMelody();
    };

    GameUI.prototype.selectExRelative = function () {
        this.deselectAllExercises();
        $selectExRelative.addClass("selected");
        this.game.loadIntervals();
    };

    GameUI.prototype.selectExPerfect = function () {
        this.deselectAllExercises();
        $selectExPerfect.addClass("selected");
        this.game.loadPerfect();
    };

    GameUI.prototype.selectExProgressions = function () {
        this.deselectAllExercises();
        $selectExProgressions.addClass("selected");
        this.game.loadChordProgressions();
    };

    GameUI.prototype.selectExChords = function () {
        this.deselectAllExercises();
        $selectExChords.addClass("selected");
        this.game.loadChordTypes();
    };

    GameUI.prototype.deselectAllExercises = function () {
        $(".js-select-ex").removeClass("selected");
    };

    GameUI.prototype.selectInsPiano = function () {
        this.deselectAllInstruments();
        $selectInsPiano.addClass("selected");
        this.game.soundManager.setInstrumentPiano();
        // ExerciseLoader.reload(); // TODO reload exercise
    };

    GameUI.prototype.selectInsGuitar = function () {
        this.deselectAllInstruments();
        $selectInsGuitar.addClass("selected");
        this.game.soundManager.setInstrumentGuitar();
        // ExerciseLoader.reload(); // TODO reload exercise
    };

    GameUI.prototype.selectInsViolin = function () {
        this.deselectAllInstruments();
        $selectInsViolin.addClass("selected");
        this.game.soundManager.setInstrumentViolin();
        // ExerciseLoader.reload(); // TODO reload exercise
    };

    GameUI.prototype.deselectAllInstruments = function () {
        $(".js-select-ins").removeClass("selected");
    };

    return GameUI;
});
