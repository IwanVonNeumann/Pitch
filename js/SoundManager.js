"use strict";

var SoundManager = {

    sounds: new Array(12 * Constants.num_octaves),

    canPlayAudio: function () {
        var audio = document.createElement("audio");
        var canPlayMP3 = (typeof audio.canPlayType === "function" && audio.canPlayType("audio/mpeg") !== "");
        var canPlayOGG = (typeof audio.canPlayType === "function" && audio.canPlayType("audio/ogg") !== "");
        return canPlayOGG || canPlayMP3;
    },

    init: function () {
        var instrument = window.parent.g_instrument;
        if (instrument === undefined)
            instrument = "piano";
        var audio = document.createElement("audio");
        var canPlayMP3 = (typeof audio.canPlayType === "function" && audio.canPlayType("audio/mpeg") !== "");
        var canPlayOGG = (typeof audio.canPlayType === "function" && audio.canPlayType("audio/ogg") !== "");

        var ext = ".ogg";
        if (!canPlayOGG)
            ext = ".mp3";

        for (var i = 0; i < this.sounds.length; ++i) {
            var ind = (i < 9) ? "0" : "";
            ind += (i + 1);

            var s = instrument + "/" + instrument + "_silence_" + ind + ext;
            ResourceLoader.addSound(s);

            //this.sounds[i] = new Audio(s);
            //this.sounds[i].preload = "auto";
        }
    },

    playSound: function (tone, volume) {
        if (volume === undefined)
            volume = 1.0;

        var s = ResourceLoader.sounds[tone];
        s.pause();
        //s.ended = false;

        s.volume = volume;
        s.currentTime = 0;
        s.play();
    }
};
