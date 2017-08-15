var AnimationManager = {

    init: function () {
        var directory = Config.target === "web"
            ? 'img/'
            : 'img/mobile/';

        this.registerImages([
            directory + 'keys_green.png',
            directory + 'keys_green_pressed.png',
            directory + 'keys_disabled.png',
            directory + 'keys_disabled_pressed.png'
        ]);
    },

    registerImages: function (images) {
        $.each(images, function (i, image) {
            ResourceLoader.registerImage(image);
        });
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
