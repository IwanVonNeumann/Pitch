var AnimationManager = {

    init: function () {
        var prefix = '';
        if (Config.target !== "web")
            prefix = 'mobile/';
        ResourceLoader.registerImage('img/' + prefix + 'keysgreen.png');
        ResourceLoader.registerImage('img/' + prefix + 'keysgreenpressed.png');
        ResourceLoader.registerImage('img/' + prefix + 'keysdisabled.png');
        ResourceLoader.registerImage('img/' + prefix + 'keysdisabledpressed.png');
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
