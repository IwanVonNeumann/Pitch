"use strict";

define("Game",
    ["$", "Config", "Constants", "GameUI", "Target", "SoundManager", "AnimationManager", "ChordSequenceType",
        "ResourceLoader", "Exercise", "ExerciseManager"],
    function ($, Config, Constants, GameUI, Target, SoundManager, AnimationManager, ChordSequenceType,
              ResourceLoader, Exercise, ExerciseManager) {

        var Game = function () {
            this.ui = new GameUI(this);
            this.animationManager = AnimationManager;
            this.chordSequenceType = ChordSequenceType;
            this.resourceLoader = ResourceLoader;

            if ('undefined' !== typeof SoundManagerAndroid) {
                Config.target = Target.ANDROID;
                this.soundManager = SoundManagerAndroid; // repair if Android support needed
            } else {
                Config.target = Target.WEB;
                this.soundManager = SoundManager;
            }

            if (!this.soundManager.canPlayAudio())
                throw "Cannot play audio!";
        };

        Game.prototype.load = function (exerciseName) {
            Config.exercise = exerciseName;
            var exercise = ExerciseManager.getExercise(exerciseName);

            var game = this;
            var ui = this.ui;

            // TODO move jQuery-related code to UI
            $(".exercise-container").load(exercise.template, function () {
                game.exercise = exercise;
                ui.setupExercise();
                // TODO probably move init() functions to constructor
                game.soundManager.init();
                game.animationManager.init();
                game.chordSequenceType.init();
                // TODO review calls: make events?
                game.resourceLoader.loadAll(ui.displayProgress.bind(ui), game.onResourcesReady.bind(game));
                ui.bindPlayButtonEvent();
            });
        };

        Game.prototype.onResourcesReady = function () {
            this.ui.removeLoader();

            Constants.init();

            this.exercise.init();
            this.exercise.draw();
        };

        Game.prototype.loadMelody = function () {
            this.load(Exercise.MELODY);
        };

        Game.prototype.loadIntervals = function () {
            this.load(Exercise.INTERVALS);
        };

        Game.prototype.loadPerfect = function () {
            this.load(Exercise.PERFECT);
        };

        Game.prototype.loadChordProgressions = function () {
            this.load(Exercise.CHORD_PROGRESSIONS);
        };

        Game.prototype.loadChordTypes = function () {
            this.load(Exercise.CHORD_TYPES);
        };

        Game.prototype.reload = function () {
            this.load(Config.exercise);
        };

        return Game;
    }
);
