"use strict";

// TODO process dependencies on "SoundManager" in Interval & Chord
define("SoundManager", ["jquery", "Config", "Constants"], function ($, Config, Constants) {

    var SoundManager = function () {
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

    // TODO load as deferred
    SoundManager.prototype.loadSounds = function (instrument) {
        var ext = this.canPlayOGG() ? ".ogg" : ".mp3";

        var NOTES_PER_OCTAVE = 12;
        var notesTotal = Constants.num_octaves * NOTES_PER_OCTAVE;

        var sounds = [];

        for (var tone = 1; tone <= notesTotal; tone++) {
            var path = this.concatPath(instrument, tone, ext);
            sounds.push(this.loadSound(path));
        }

        return sounds;
    };

    SoundManager.prototype.concatPath = function (instrument, tone, ext) {
        var prefix = (tone < 10) ? "0" : "";
        var index = prefix + tone;
        var directory = "sound/" + instrument + "/";
        var fileName = instrument + "_silence_" + index + ext;
        return directory + fileName;
    };

    SoundManager.prototype.loadSound = function (path) {
        return new Audio(path);
        // TODO bind event listener when known with loading progress displaying
        // audio.addEventListener('canplaythrough', this.resourceLoaded());
    };

    return new SoundManager();
});
