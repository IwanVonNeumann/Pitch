"use strict";

define("AnimationManager", ["Config", "Target", "ResourceLoader"], function (Config, Target, ResourceLoader) {

    return {
        init: function () {
            this.registeredImages = [];

            var directory = Config.target === Target.WEB
                ? 'img/'
                : 'img/mobile/';

            this.registerImages([
                directory + 'keys_green.png',
                directory + 'keys_green_pressed.png',
                directory + 'keys_disabled.png',
                directory + 'keys_disabled_pressed.png'
            ]);
        },

        registerImages: function (paths) {
            var registerImage = this.registerImage;
            $.each(paths, function (i, path) {
                registerImage(path);
            });
        },

        registerImage: function (path) {
            // this.registeredImages.push(path);
            ResourceLoader.registerImage(path);
        },

        CreateKeysGreenAnim: function () {
            return ResourceLoader.images[0];
        },

        CreateKeysGreenPressedAnim: function () {
            return ResourceLoader.images[1];
        },

        CreateKeysDisabledAnim: function () {
            return ResourceLoader.images[2];
        },

        CreateKeysDisabledPressedAnim: function () {
            return ResourceLoader.images[3];
        }
    };
});
