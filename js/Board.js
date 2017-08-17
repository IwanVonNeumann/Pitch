if ('undefined' !== typeof SoundManagerAndroid)
    Config.target = "android";
else {
    Config.target = "web";
}

var ex = null;

function touchDown(e) {
    var ev = e.touches[0];
    ex.mouseDown(ev.clientX, ev.clientY);
}

function touchUp() {
    ex.mouseUp();
}

function mouseDown(e) {
    ex.mouseDown(e.clientX, e.clientY);
}

function mouseUp(e) {
    ex.mouseUp(e.clientX, e.clientY);
}

if (Config.target === "web") {
    document.onmousedown = mouseDown;
    document.onmouseup = mouseUp;
}
else {
    document.ontouchstart = touchDown;
    document.ontouchend = touchUp;
}

function removeStub() {
    var exercise = (document.getElementsByClassName("exercise"))[0];
    var stub = (document.getElementsByClassName("stub"));
    if (stub.length > 0) {
        stub = stub[0];
        exercise.removeChild(stub);
    }
}

if (Config.target === "web")
    window.onresize = function () {
        //
        if (!SoundManager.canPlayAudio())
            return;

        var canvas = document.getElementById("canvas");
        var exercise = (document.getElementsByClassName("exercise"))[0];
        if (canvas) {
            canvas.width = exercise.clientWidth;
            canvas.height = Math.floor(exercise.clientHeight * 0.5);
            canvas.style.width = exercise.clientWidth;
            canvas.style.height = Math.floor(exercise.clientHeight * 0.5);

            Constants.scr_w = canvas.clientWidth;
            Constants.scr_h = canvas.clientHeight;
        }
        else {
            Constants.scr_w = exercise.clientWidth;
            Constants.scr_h = exercise.clientHeight;
        }


        if (ex !== null)
            ex.draw();

    };

window.onselectstart = function () {
    return false;
};

var t;

// var reloaded = false;

function drawFlush() {

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
    }
    else {
        Constants.scr_w = exercise.clientWidth;
        Constants.scr_h = exercise.clientHeight;
    }

    Constants.init();
    ex.init();

    ex.draw();
}

function loadProgress(percent) {
    var loader = (document.getElementsByClassName("loader"))[0];
    loader.innerHTML = "Loading " + percent.toString() + "%";
}

//window.onload = function()
function onLoad(exercise) {
    ex = exercise;

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

    removeStub();

    if (Config.target === "android")
        SoundManager = SoundManagerAndroid;

    if (!SoundManager.canPlayAudio())
        return;

    SoundManager.init();
    AnimationManager.init();
    SequenceChordTypes.init();
    ResourceLoader.loadAll(loadProgress, drawFlush);
}

function play() {

    if (ex.state === exerciseStates.answered)
        exerciseFns.setState(ex, exerciseStates.pending);

    ex.playTask();
}
