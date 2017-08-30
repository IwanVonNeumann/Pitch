"use strict";

// TODO remove this
define("ResourceLoader", function () {

    return {
        loadedCount: 0,

        init: function () {
            this.loadedCount = 0;
        },

        loadAll: function (displayProgress, allResourcesLoaded) {
            this.displayProgress = displayProgress;
            this.allResourcesLoaded = allResourcesLoaded;
        },

        // never called now
        resourceLoaded: function () {
            this.loadedCount++;
            var totalResources = this.images.length + this.sounds.length;

            if (this.loadedCount < totalResources) {
                var progress = Math.floor((this.loadedCount * 100) / totalResources);
                this.displayProgress(progress);
                console.log("Something loaded:", progress);
            } else {
                this.allResourcesLoaded();
                console.log("Everything loaded!");
            }
        }
    };
});
