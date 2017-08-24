"use strict";

define("SoundManager", ["Config", "Constants", "ResourceLoader"], function (Config, Constants, ResourceLoader) {

    return {
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
            this.registeredSounds = [];
            this.registerSounds();
        },

        registerSounds: function () {
            var instrument = Config.instrument || "piano";

            var ext = this.canPlayOGG() ? ".ogg" : ".mp3";

            // TODO remove
            // ResourceLoader.reset(); // TODO create new ResourceLoader

            var NOTES_PER_OCTAVE = 12;
            var notesTotal = Constants.num_octaves * NOTES_PER_OCTAVE;

            for (var tone = 1; tone <= notesTotal; tone++) {
                var path = this.concatPath(instrument, tone, ext);
                this.registerSound(path);
            }
        },

        concatPath: function (instrument, tone, ext) {
            var prefix = (tone < 10) ? "0" : "";
            var index = prefix + tone;
            var directory = "sound/" + instrument + "/";
            var fileName = instrument + "_silence_" + index + ext;
            return directory + fileName;
        },

        registerSound: function (path) {
            // this.registeredSounds.push(path);
            ResourceLoader.registerSound(path);
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
});
