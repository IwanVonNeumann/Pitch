define("KbdMeasurements", ["Config", "Constants"], function (Config, Constants) {

    return {

        width: 0,
        height: 0,
        num_keys_on_screen: 0,

        init: function (w, h) {
            this.width = w;
            this.height = h;

            if (Config.target === "web") {
                this.num_keys_on_screen = 7 * Constants.num_octaves;
            } else {
                this.num_keys_on_screen = Math.floor(DeviceMeasurements.widthInches() / (3.0 / 9.0));//9 keys on a 3" screen
                if (this.num_keys_on_screen > Constants.num_octaves * 7)
                    this.num_keys_on_screen = Constants.num_octaves * 7;

                if (this.num_keys_on_screen < 8)
                    this.num_keys_on_screen = 8;
            }
        },

        getKeyXSrc: function (key) {
            var tone_in_oct = key % Constants.num_tones_in_octave;
            var btn_w = this.width / 7;
            var ind = 0;

            for (var i = 0; i < tone_in_oct; ++i) {
                var kb = Constants.isBlack(key);
                var ib = Constants.isBlack(i);
                if (Constants.isBlack(key) === Constants.isBlack(i))
                    ++ind;
            }

            return Math.floor(btn_w * ind);
        },

        getKeyYSrc: function (key) {
            return Constants.isBlack(key) ? Math.floor((this.height * 2) / 3) : 0;
        },

        getKeyWSrc: function () {
            return Math.floor(this.width / 7) + 1;
        },

        getKeyHSrc: function (key) {
            return Math.floor(Constants.isBlack(key) ? (this.height / 3) : (2 * (this.height / 3)))
        },

        getKeyDisplayX: function (key) {
            var tone_index = 0;

            for (var t = 0; t < (key % 12); ++t)
                if (!Constants.isBlack(t))
                    tone_index++;

            var keyx = Math.floor((this.getKeyDisplayWFloat()) * tone_index + 1);

            if (Constants.isBlack(key))
                keyx -= Math.floor(this.getKeyDisplayWFloat() / 2);

            return keyx + Math.floor(Math.floor(key / 12) * (this.getKeyDisplayWFloat()) * 7);
        },

        getRightBorderX: function () {
            return 3 * (this.getKeyDisplayWFloat()) * 7;
        },

        getKeyDisplayY: function () {
            return 0;//Math.floor(Constants.phiOrder(2)*Constants.scr_h);
        },

        getNumKeysOnScreen: function () {
            return this.num_keys_on_screen;
        },

        getKeyDisplayWFloat: function () {
            return Constants.scr_w / this.getNumKeysOnScreen();
        },

        getKeyDisplayW: function () {
            return Math.floor(this.getKeyDisplayWFloat());
        },

        getKeyDisplayH: function (key) {
            var sz = this.getBlackKeyHeight();
            return Constants.isBlack(key) ? sz : (2 * sz);
        },

        getBlackKeyHeight: function () {
            return Math.floor(Constants.scr_h / 2);
        }
    };
});
