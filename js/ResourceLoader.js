"use strict";

var ResourceLoader = {

    sounds: null,
    images: null,
    loadedCount: 0,
    imgloaded: 0,

    // TODO create constructor
    reset: function () {
        this.sounds = null;
        this.images = null;
        this.loadedCount = 0;
        this.imgloaded = 0;
    },

    addImage: function (path) {
        //console.log("added image: " + path);
        if (this.images === null)
            this.images = [];

        this.images.push(path);
    },

    addSound: function (path) {
        if (this.sounds === null) {
            this.sounds = [];
        }

        this.sounds.push(path);
    },

    loadAll: function (iloadProgress, icallback) {
        this.callback = icallback;
        this.loadProgress = iloadProgress;

        if (this.images !== null)
            for (var i = 0; i < this.images.length; ++i) {
                var path = this.images[i];
                this.images[i] = new Image();
                this.images[i].onload = ResourceLoader.resourceLoaded;
                this.images[i].onerror = this.aborted;
                this.images[i].onabort = this.error;
                this.images[i].src = path;
            }

        if (this.sounds !== null)
            for (i = 0; i < this.sounds.length; ++i) {
                path = this.sounds[i];
                this.sounds[i] = new Audio(path);
                this.sounds[i].addEventListener('canplaythrough', ResourceLoader.resourceLoaded(), false);
            }
    },


    resourceLoaded: function () {
        ResourceLoader.loadedCount++;
        var totalImages = ResourceLoader.images === null ? 0 : ResourceLoader.images.length;
        var totalSounds = ResourceLoader.sounds === null ? 0 : ResourceLoader.sounds.length;
        var totalResources = totalImages + totalSounds;

        if (ResourceLoader.loadedCount < totalResources) {
            var progress = Math.floor((ResourceLoader.loadedCount * 100) / totalResources);
            ResourceLoader.loadProgress(progress);
        } else {
            ResourceLoader.callback();
        }
    },

    aborted: function () {
        console.log("resource abortion");
    },

    error: function (error) {
        console.log("resource error");
    }
};
