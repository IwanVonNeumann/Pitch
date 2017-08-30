"use strict";

define("ImageManager", ["jquery", "Config", "Target"], function ($, Config, Target) {

    var IMAGE_DIRECTORY = {};
    IMAGE_DIRECTORY[Target.WEB] = "img/";
    IMAGE_DIRECTORY[Target.ANDROID] = "img/mobile/";

    var directory = IMAGE_DIRECTORY[Config.target];

    var IMAGE_PATHS = [
        directory + 'keys_green.png',
        directory + 'keys_green_pressed.png',
        directory + 'keys_disabled.png',
        directory + 'keys_disabled_pressed.png'
    ];

    var ImageManager = function () {
        this.images = [];
    };

    ImageManager.prototype.loadImages = function () {
        var paths = IMAGE_PATHS;
        var images = this.images;
        var deferredMap = {};
        var deferredArray = [];

        for (var i = 0; i < paths.length; i++) {
            var deferred = new $.Deferred();
            var path = paths[i];
            deferredMap[path] = deferred;
            deferredArray.push(deferred);

            this.loadImage(path).then(function (image) {
                images.push(image);
                var src = $(image).attr("src");
                deferredMap[src].resolve();
            });
        }

        return $.when.apply($, deferredArray);
    };

    ImageManager.prototype.loadImage = function (url) {

        var loadImage = function (deferred) {
            var image = new Image();

            image.onload = function () {
                unbindEvents();
                deferred.resolve(image);
            };

            image.onerror = function () {
                unbindEvents();
                deferred.reject(image);
                throw "Image loading error: " + path;
            };

            image.onabort = function () {
                unbindEvents();
                deferred.reject(image);
                throw "Image loading aborted: " + path;
            };

            function unbindEvents() {
                image.onload = null;
                image.onerror = null;
                image.onabort = null;
            }

            image.src = url;
        };

        return $.Deferred(loadImage).promise();
    };

    ImageManager.prototype.getKeysActive = function () {
        return this.images[0];
    };

    ImageManager.prototype.getKeysActivePressed = function () {
        return this.images[1];
    };

    ImageManager.prototype.getKeysDisabled = function () {
        return this.images[2];
    };

    ImageManager.prototype.getKeysDisabledPressed = function () {
        return this.images[3];
    };

    return new ImageManager();
});
