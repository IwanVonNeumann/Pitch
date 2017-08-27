"use strict";

define("ImageManager", ["$", "Config", "Target", "ResourceLoader"], function ($, Config, Target, ResourceLoader) {

    var IMAGE_DIRECTORY = {};
    IMAGE_DIRECTORY[Target.WEB] = "img/";
    IMAGE_DIRECTORY[Target.ANDROID] = "img/mobile/";

    var AnimationManager = function () {
        // this.registeredImages = [];

        var directory = IMAGE_DIRECTORY[Config.target];

        this.registerImages([
            directory + 'keys_green.png',
            directory + 'keys_green_pressed.png',
            directory + 'keys_disabled.png',
            directory + 'keys_disabled_pressed.png'
        ]);
    };

    AnimationManager.prototype.registerImages = function (paths) {
        var registerImage = this.registerImage;
        $.each(paths, function (i, path) {
            registerImage(path);
        });
    };

    AnimationManager.prototype.registerImage = function (path) {
        // this.registeredImages.push(path);
        ResourceLoader.registerImage(path);
    };

    AnimationManager.prototype.CreateKeysGreenAnim = function () {
        return ResourceLoader.images[0];
    };

    AnimationManager.prototype.CreateKeysGreenPressedAnim = function () {
        return ResourceLoader.images[1];
    };

    AnimationManager.prototype.CreateKeysDisabledAnim = function () {
        return ResourceLoader.images[2];
    };

    AnimationManager.prototype.CreateKeysDisabledPressedAnim = function () {
        return ResourceLoader.images[3];
    };

    return new AnimationManager();
});
