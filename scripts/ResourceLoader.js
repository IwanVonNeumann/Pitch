"use strict";

define("ResourceLoader", ["EventBus"], function (EventBus) {

    return {
        sounds: [],
        images: [],
        loadedCount: 0,

        // TODO create constructor
        init: function () {
            this.sounds = [];
            this.images = [];
            this.loadedCount = 0;

            EventBus.bind("resource:load", function () {

            }, this);
        },

        registerImage: function (path) {
            this.images.push(path);
        },

        registerSound: function (path) {
            this.sounds.push(path);
        },

        loadAll: function (displayProgress, allResourcesLoaded) {
            this.displayProgress = displayProgress;
            this.allResourcesLoaded = allResourcesLoaded;
            this.loadImages();
            this.loadSounds();
        },

        loadImages: function () {
            function imageLoadingAborted() {
                console.log("resource abortion");
            }

            function imageLoadingError() {
                console.log("resource error");
            }

            for (var i = 0; i < this.images.length; ++i) {
                var path = this.images[i];
                this.images[i] = new Image();
                this.images[i].onload = this.resourceLoaded.bind(this);
                this.images[i].onerror = imageLoadingAborted;
                this.images[i].onabort = imageLoadingError;
                this.images[i].src = path;
            }
        },

        loadSounds: function () {
            for (var i = 0; i < this.sounds.length; ++i) {
                var path = this.sounds[i];
                this.sounds[i] = new Audio(path);
                this.sounds[i].addEventListener('canplaythrough', this.resourceLoaded());
            }
        },

        resourceLoaded: function () {
            this.loadedCount++;
            var totalResources = this.images.length + this.sounds.length;

            if (this.loadedCount < totalResources) {
                var progress = Math.floor((this.loadedCount * 100) / totalResources);
                this.displayProgress(progress);
            } else {
                this.allResourcesLoaded();
            }
        }
    };
});
