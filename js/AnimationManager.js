var AnimationManager = {

    init: function () {
        var prefix = Config.target === "web" ? '' : 'mobile/';

        this.registerImages([
            'img/' + prefix + 'keysgreen.png',
            'img/' + prefix + 'keysgreenpressed.png',
            'img/' + prefix + 'keysdisabled.png',
            'img/' + prefix + 'keysdisabledpressed.png'
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
