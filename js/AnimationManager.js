var AnimationManager =
    {

        init: function () {
            var prefix = '';
            if (Config.target !== "web")
                prefix = 'mobile/';
            ResourceLoader.addImage('img/' + prefix + 'keysgreen.png');
            ResourceLoader.addImage('img/' + prefix + 'keysgreenpressed.png');
            ResourceLoader.addImage('img/' + prefix + 'keysdisabled.png');
            ResourceLoader.addImage('img/' + prefix + 'keysdisabledpressed.png');
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
