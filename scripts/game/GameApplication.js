/**
 * Created by Iwan on 29.08.2017.
 */

"use strict";

define("GameApplication",
    ["jquery", "underscore", "backbone", "marionette", "GameView", "ImageManager"],
    function ($, _, Backbone, Marionette, GameView, ImageManager) {

        var GameApplication = Marionette.Application.extend({
            region: ".container",

            onStart: function () {
                this.showView(new GameView());
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
