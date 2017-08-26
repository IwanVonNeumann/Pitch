"use strict";

// TODO process dependencies on "SoundManager" in Interval & Chord
define("SoundManager",
    ["EventBus", "Config", "Constants", "Instrument", "ResourceLoader"],
    function (EventBus, Config, Constants, Instrument, ResourceLoader) {

        var SoundManager = function (instrument) {
            Config.instrument = instrument || Config.instrument;

            // this.registeredSounds = [];
            this.registerSounds();

            EventBus.bind("instrument:set", function (instrumentName) {
                this.setInstrument(instrumentName)
            }, this);
        };

        SoundManager.prototype.canPlayAudio = function () {
            return this.canPlayOGG() || this.canPlayMP3();
        };

        SoundManager.prototype.canPlayMP3 = function () {
            var audio = document.createElement("audio");
            return typeof audio.canPlayType === "function" && audio.canPlayType("audio/mpeg") !== "";
        };

        SoundManager.prototype.canPlayOGG = function () {
            var audio = document.createElement("audio");
            return typeof audio.canPlayType === "function" && audio.canPlayType("audio/ogg") !== "";
        };

        SoundManager.prototype.registerSounds = function () {
            var instrument = Config.instrument.toLowerCase();

            var ext = this.canPlayOGG() ? ".ogg" : ".mp3";

            var NOTES_PER_OCTAVE = 12;
            var notesTotal = Constants.num_octaves * NOTES_PER_OCTAVE;

            for (var tone = 1; tone <= notesTotal; tone++) {
                var path = this.concatPath(instrument, tone, ext);
                this.registerSound(path);
            }
        };

        SoundManager.prototype.concatPath = function (instrument, tone, ext) {
            var prefix = (tone < 10) ? "0" : "";
            var index = prefix + tone;
            var directory = "sound/" + instrument + "/";
            var fileName = instrument + "_silence_" + index + ext;
            return directory + fileName;
        };

        SoundManager.prototype.registerSound = function (path) {
            // this.registeredSounds.push(path);
            ResourceLoader.registerSound(path);
        };

        SoundManager.prototype.playSound = function (tone, volume) {
            volume = volume || 1.0;

            var s = ResourceLoader.sounds[tone];
            s.pause();
            //s.ended = false;

            s.volume = volume;
            s.currentTime = 0;
            s.play();
        };

        SoundManager.prototype.setInstrument = function (name) {
            Config.instrument = name;
            // TODO reload sounds or recreate object?
        };

        return SoundManager;
    }
);
