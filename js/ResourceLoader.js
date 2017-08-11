"use strict";

var ResourceLoader = {

    sounds: null,
    images: null,
    numloaded: 0,
    imgloaded: 0,

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
        ++ResourceLoader.numloaded;
        var total = (ResourceLoader.images === null ? 0 : ResourceLoader.images.length)
            + (ResourceLoader.sounds === null ? 0 : ResourceLoader.sounds.length);

        if (ResourceLoader.numloaded === total) {
            ResourceLoader.callback();
        }
        else
            ResourceLoader.loadProgress(Math.floor((ResourceLoader.numloaded * 100) / total));
    },

    aborted: function () {
        console.log("resource abortion");
    },

    error: function (error) {
        console.log("resource error");
    }
};
