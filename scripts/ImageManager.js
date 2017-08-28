"use strict";

define("ImageManager", ["$", "Config", "Target"], function ($, Config, Target) {

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

    var AnimationManager = function () {
        this.images = [];
        this.loadImages(IMAGE_PATHS);
    };

    AnimationManager.prototype.loadImages = function (paths) {
        var loadImage = this.loadImage.bind(this);
        $.each(paths, function (i, path) {
            loadImage(path);
        });
    };

    AnimationManager.prototype.loadImage = function (path) {
        var image = new Image();
        image.src = path;
        // image.onload = this.resourceLoaded.bind(this);
        image.onerror = function () {
            throw "Image loading error: " + path;
        };
        image.onabort = function () {
            throw "Image loading aborted: " + path;
        };
        this.images.push(image);
    };

    AnimationManager.prototype.getKeysActive = function () {
        return this.images[0];
    };

    AnimationManager.prototype.getKeysActivePressed = function () {
        return this.images[1];
    };

    AnimationManager.prototype.getKeysDisabled = function () {
        return this.images[2];
    };

    AnimationManager.prototype.getKeysDisabledPressed = function () {
        return this.images[3];
    };

    return new AnimationManager();
});
