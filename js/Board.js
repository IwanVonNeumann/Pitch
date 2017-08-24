define("Board",
    ["Config", "Constants", "exerciseFns", "exerciseStates", "SoundManager", "AnimationManager", "ChordSequenceType",
        "ResourceLoader"],
    function (Config, Constants, exerciseFns, exerciseStates, SoundManager, AnimationManager, ChordSequenceType,
              ResourceLoader) {

        return {
            ex: null,

            //window.onload = function()
            load: function (exercise) {
                this.ex = exercise;

                if (Config.target === "web") {
                    //for the mobile apps the height must be fullscreen
                    $(".exercise").css({height: "320px"});
                } else {
                    //for the mobile apps the height must be fullscreen
                    $(".exercise").css({
                        width: "100%",
                        borderRadius: "0"
                    });
                    $(".upper").css({borderRadius: '0'});
                    $(".playbtn").css({borderRadius: '0'});
                    // document.style.background = 'black';
                }

                this.removeStub();

                if (Config.target === "android")
                    SoundManager = SoundManagerAndroid;

                if (!SoundManager.canPlayAudio())
                    return;

                SoundManager.init();
                AnimationManager.init();
                ChordSequenceType.init();
                // TODO review
                ResourceLoader.loadAll(this.loadProgress.bind(this), this.drawFlush.bind(this));
                // ResourceLoader.loadAll();
            },

            loadProgress: function (percent) {
                var loader = (document.getElementsByClassName("loader"))[0];
                loader.innerHTML = "Loading " + percent.toString() + "%";
            },

            drawFlush: function () {
                var exercise = (document.getElementsByClassName("exercise"))[0];

                var loader = (document.getElementsByClassName("loader"));
                if (loader.length > 0) {
                    loader = loader[0];
                    exercise.removeChild(loader);
                }

                var canvas = document.getElementById("canvas");
                if (canvas !== null) {
                    canvas.width = exercise.clientWidth;
                    canvas.height = Math.floor(exercise.clientHeight * 0.5);
                } else {
                    Constants.scr_w = exercise.clientWidth;
                    Constants.scr_h = exercise.clientHeight;
                }

                Constants.init();

                this.ex.init();
                this.ex.draw();
            },

            removeStub: function () {
                var exercise = (document.getElementsByClassName("exercise"))[0];
                var stub = (document.getElementsByClassName("stub"));
                if (stub.length > 0) {
                    stub = stub[0];
                    exercise.removeChild(stub);
                }
            }
        };
    }
);
