"use strict";

define("Game",
    ["$", "EventBus", "Config", "Constants", "GameUI", "Target", "SoundManager",
        "ResourceLoader", "InstrumentManager", "Exercise", "ExerciseManager"],
    function ($, EventBus, Config, Constants, GameUI, Target, SoundManager,
              ResourceLoader, InstrumentManager, Exercise, ExerciseManager) {

        var Game = function () {
            this.ui = new GameUI(this);
            this.resourceLoader = ResourceLoader;
            this.instrument = InstrumentManager.getInstrument(Config.instrument);

            if ('undefined' !== typeof SoundManagerAndroid) {
                Config.target = Target.ANDROID;
                this.soundManager = SoundManagerAndroid; // repair if Android support needed
            } else {
                Config.target = Target.WEB;
                this.soundManager = SoundManager;
            }

            if (!this.soundManager.canPlayAudio())
                throw "Cannot play audio!";

            this.bindEventListeners();
        };

        Game.prototype.bindEventListeners = function () {
            EventBus.bind("exercise:set", function (exerciseName) {
                this.load(exerciseName)
            }, this);

            // TODO finish with this
            EventBus.bind("instrument:set", function (instrumentName) {
                Config.instrument = instrumentName;
                // this.setInstrument(instrumentName)
            }, this);
        };

        Game.prototype.load = function (exerciseName) {
            Config.exercise = exerciseName;

            this.exercise = ExerciseManager.getExercise(exerciseName);
            this.exercise.instrument = this.instrument;

            var game = this;
            var ui = this.ui;

            // TODO move jQuery-related code to UI
            $(".exercise-container").load(this.exercise.template, function () {
                ui.setupExercise();
                // TODO review calls: make events?
                // game.resourceLoader.loadAll(ui.displayProgress.bind(ui), game.onResourcesReady.bind(game));
                game.onResourcesReady();
            });
        };

        Game.prototype.onResourcesReady = function () {
            this.ui.removeLoader();

            Constants.init();

            this.exercise.init();
            this.exercise.draw();
        };

        Game.prototype.reload = function () {
            this.load(Config.exercise);
        };

        return Game;
    }
);
