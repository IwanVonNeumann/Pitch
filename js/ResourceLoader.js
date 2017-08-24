"use strict";

define("ResourceLoader", function () {
    // TODO return Object literal
    // TODO turn pointers to 'this'

    var ResourceLoader = {
        sounds: [],
        images: [],
        loadedCount: 0,

        // TODO create constructor
        reset: function () {
            this.sounds = [];
            this.images = [];
            this.loadedCount = 0;
        },

        registerImage: function (path) {
            this.images.push(path);
        },

        registerSound: function (path) {
            this.sounds.push(path);
        },

        loadAll: function (displayProgress, allResourcesLoaded) {
            this.allResourcesLoaded = allResourcesLoaded;
            this.displayProgress = displayProgress;
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

            if (this.images)
                for (var i = 0; i < this.images.length; ++i) {
                    var path = this.images[i];
                    this.images[i] = new Image();
                    this.images[i].onload = ResourceLoader.resourceLoaded;
                    this.images[i].onerror = imageLoadingAborted;
                    this.images[i].onabort = imageLoadingError;
                    this.images[i].src = path;
                }
        },

        loadSounds: function () {
            if (this.sounds)
                for (var i = 0; i < this.sounds.length; ++i) {
                    var path = this.sounds[i];
                    this.sounds[i] = new Audio(path);
                    this.sounds[i].addEventListener('canplaythrough', ResourceLoader.resourceLoaded());
                }
        },

        resourceLoaded: function () {
            ResourceLoader.loadedCount++;
            var totalResources = ResourceLoader.images.length + ResourceLoader.sounds.length;

            if (ResourceLoader.loadedCount < totalResources) {
                var progress = Math.floor((ResourceLoader.loadedCount * 100) / totalResources);
                ResourceLoader.displayProgress(progress);
            } else {
                ResourceLoader.allResourcesLoaded();
            }
        }
    };

    return ResourceLoader;
});
