"use strict";

var SoundManager = {

    canPlayAudio: function () {
        return this.canPlayOGG() || this.canPlayMP3();
    },
    
    canPlayMP3: function () {
        var audio = document.createElement("audio");
        return typeof audio.canPlayType === "function" && audio.canPlayType("audio/mpeg") !== "";
    },

    canPlayOGG: function () {
        var audio = document.createElement("audio");
        return typeof audio.canPlayType === "function" && audio.canPlayType("audio/ogg") !== "";
    },

    init: function () {
        var instrument = Config.instrument || "piano";

        var ext = this.canPlayOGG() ? ".ogg" : ".mp3";

        ResourceLoader.reset(); // TODO create new ResourceLoader

        var NOTES_PER_OCTAVE = 12;
        var notesTotal = Constants.num_octaves * NOTES_PER_OCTAVE;

        for (var i = 1; i <= notesTotal; i++) {
            var prefix = (i < 10) ? "0" : "";
            var index = prefix + i;

            var directory = "sound/" + instrument + "/";
            var fileName = instrument + "_silence_" + index + ext;
            var path = directory + fileName;
            
            ResourceLoader.registerSound(path);
        }
    },

    playSound: function (tone, volume) {
        volume = volume || 1.0;

        var s = ResourceLoader.sounds[tone];
        s.pause();
        //s.ended = false;

        s.volume = volume;
        s.currentTime = 0;
        s.play();
    }
};
