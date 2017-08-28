define("Keyboard",
    ["Constants", "KbdMeasurements", "ImageManager"],
    function (Constants, KbdMeasurements, ImageManager) {

        var Keyboard = function (colored) {

            this.keysactive_img = ImageManager.getKeysActive();
            this.keysdisabled_img = ImageManager.getKeysDisabled();
            this.keyspressed_img = ImageManager.getKeysDisabledPressed();
            this.keyspressedactive_img = ImageManager.getKeysActivePressed();

            this.canvas = document.getElementById("canvas");
            //this.canvas.width = Constants.scr_w;
            this.context = this.canvas.getContext("2d");

            this.keys_down = [];

            for (var octave_ind = 0; octave_ind < Constants.num_octaves; ++octave_ind)
                for (var tone_ind = 0; tone_ind < Constants.num_tones_in_octave; ++tone_ind)
                    this.keys_down.push(false);

            KbdMeasurements.init(this.keysactive_img.width, this.keysactive_img.height);
        };


        Keyboard.prototype = {
            play_y: 70,
            play_x: 210,
            play_w: 120,
            play_h: 42,

            Init: function (colored) {

            },

            keyHitTest: function (x, y, kbdx) {
                x += kbdx;
                var keys_img = this.keysAnimated(0);
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                var xloc = x - this.canvas.offsetLeft;
                var yloc = y - this.canvas.offsetTop;

                for (var t = 0; t < Constants.num_tones_in_octave * Constants.num_octaves; ++t) {
                    var keyx = KbdMeasurements.getKeyDisplayX(t);
                    var keyy = KbdMeasurements.getKeyDisplayY();
                    var keyw = KbdMeasurements.getKeyDisplayW();
                    var keyh = KbdMeasurements.getKeyDisplayH(t);

                    if ((xloc > keyx) && (xloc < keyx + keyw) &&
                        (yloc > keyy) && (yloc < keyy + keyh))
                    //now check the pixel
                    {
                        var xrel = (xloc - keyx) / keyw;
                        var yrel = (yloc - keyy) / keyh;


                        var wsrc = KbdMeasurements.getKeyWSrc();
                        var hsrc = KbdMeasurements.getKeyHSrc(t);
                        var xsrc = Math.floor(xrel * wsrc);
                        var ysrc = Math.floor(yrel * hsrc);

                        canvas.width = wsrc;
                        canvas.height = hsrc;

                        //console.log("xsrc: ", xsrc, "ysrc: ", ysrc);
                        ctx.drawImage(keys_img, KbdMeasurements.getKeyXSrc(t),
                            KbdMeasurements.getKeyYSrc(t), wsrc, hsrc, 0, 0, wsrc, hsrc);
                        //this.context.drawImage(keys_img, KbdMeasurements.getKeyXSrc(t),
                        //                                 KbdMeasurements.getKeyYSrc(t), wsrc, hsrc, 200, 0, wsrc, hsrc);

                        var data = ctx.getImageData(1, 1, canvas.width, canvas.height).data;


                        var pixel_ind = Math.floor((ysrc * wsrc + xsrc) * 4);


                        var r = data[pixel_ind + 0];
                        var g = data[pixel_ind + 1];
                        var b = data[pixel_ind + 2];
                        var alpha = data[pixel_ind + 3];

                        if (alpha !== 0) {
                            this.keys_down[t] = true;
                            return t;
                        }
                    }
                }

                return -1;
            },

            mouseUp: function () {
                for (var i = 0; i < this.keys_down.length; ++i)
                    this.keys_down[i] = false;
            },

            drawBackground: function (key_h) {
                this.context.drawImage(this.bkghi, 0, 0);
                this.context.drawImage(this.bkglo, 0, (Constants.key_h0 + Constants.key_h1) * Constants.key_scale + key_h);
            },

            keysAnimated: function (key_active, key_pressed) {
                if (key_active)
                    return key_pressed ? this.keyspressedactive_img : this.keysactive_img;
                //not active keys
                return key_pressed ? this.keyspressed_img : this.keysdisabled_img;
            },

            drawKey: function (x_keyboard, y, key, key_active, key_pressed) {
                var keys_img = this.keysAnimated(key_active, key_pressed);

                //console.log("image complete:" + keys_img.complete.toString());
                var canvas = document.getElementById("canvas");
                var context = canvas.getContext("2d");

                context.drawImage(keys_img,
                    KbdMeasurements.getKeyXSrc(key),
                    KbdMeasurements.getKeyYSrc(key),
                    KbdMeasurements.getKeyWSrc(),
                    KbdMeasurements.getKeyHSrc(key),
                    KbdMeasurements.getKeyDisplayX(key) - x_keyboard,
                    KbdMeasurements.getKeyDisplayY(),
                    KbdMeasurements.getKeyDisplayW(),
                    KbdMeasurements.getKeyDisplayH(key));
            },

            draw: function (x_keyboard, y, keys_active) {
                //alert(this.keys_down.toString());

                for (var ind = 0; ind < keys_active.length; ++ind)
                    this.drawKey(x_keyboard, y, ind, keys_active[ind], this.keys_down[ind]);
            },

            hideSubscribeKey: function () {
                (document.getElementsByClassName("roottext"))[0].textContent = "";
            },

            subscribeKey: function (key, kbd_focus_x) {
                var roottext = (document.getElementsByClassName("roottext"))[0];
                roottext.style.left = (KbdMeasurements.getKeyDisplayX(key) - kbd_focus_x).toString() + "px";

                var padtop = KbdMeasurements.getKeyDisplayY() + Math.floor(KbdMeasurements.getBlackKeyHeight() / 2);
                if (!Constants.isBlack(key))
                    padtop += KbdMeasurements.getBlackKeyHeight();

                var fs = Math.floor(KbdMeasurements.getKeyDisplayW() / 2);
                // roottext.style.fontSize = fs.toString() + "px";
                roottext.style.top = (padtop - Math.floor(fs / 2)).toString() + "px";
                roottext.style.width = KbdMeasurements.getKeyDisplayW().toString() + "px";
                roottext.textContent = Constants.toneName(key);
            },

            subscribeKeyFull: function (key, kbd_focus_x) {
                var roottext = (document.getElementsByClassName("octavetext"))[0];
                roottext.style.left = (KbdMeasurements.getKeyDisplayX(key) - kbd_focus_x).toString() + "px";

                var padtop = KbdMeasurements.getKeyDisplayY() + Math.floor(KbdMeasurements.getBlackKeyHeight() / 2);
                if (!Constants.isBlack(key))
                    padtop += KbdMeasurements.getBlackKeyHeight();

                var fs = Math.floor(KbdMeasurements.getKeyDisplayW() / 2);
                // roottext.style.fontSize = fs.toString() + "px";
                roottext.style.top = (padtop - Math.floor(fs / 2)).toString() + "px";
                roottext.style.width = KbdMeasurements.getKeyDisplayW().toString() + "px";
                roottext.textContent = Constants.longToneName(key);
            }
        };

        return Keyboard;
    }
);
