/**
 * Created by Iwan on 29.08.2017.
 */

"use strict";

define("GameApplication",
    ["jquery", "underscore", "backbone", "marionette", "Config", "Target", "GameView", "ImageManager", "SoundManager",
        "SoundManagerAndroid"],
    function ($, _, Backbone, Marionette, Config, Target, GameView, ImageManager, SoundManager,
              SoundManagerAndroid) {

        var GameApplication = Marionette.Application.extend({
            region: ".container",

            onStart: function () {
                this.testSoundManager();

                this.showView(new GameView());
            },

            testSoundManager: function () {
                var SOUND_MANAGER = {};
                SOUND_MANAGER[Target.WEB] = SoundManager;
                SOUND_MANAGER[Target.ANDROID] = SoundManagerAndroid;

                var soundManager = SOUND_MANAGER[Config.target];

                if (!soundManager.canPlayAudio()) {
                    throw "Cannot play audio!";
                }
            }
        });

        var gameApplication = new GameApplication();

        gameApplication.on("start", function () {
            Backbone.history.start();
        });

        ImageManager.loadImages().then(function () {
            gameApplication.start();
        });
    }
);
