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

function touchUp(e) {
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
    var excercise = (document.getElementsByClassName("excercise"))[0];
    var stub = (document.getElementsByClassName("stub"));
    if (stub.length > 0) {
        stub = stub[0];
        excercise.removeChild(stub);
    }
}

if (Config.target === "web")
    window.onresize = function () {
        //
        if (!SoundManager.canPlayAudio())
            return;

        var canvas = document.getElementById("canvas");
        var excercise = (document.getElementsByClassName("excercise"))[0];
        if (canvas) {
            canvas.width = excercise.clientWidth;
            canvas.height = Math.floor(excercise.clientHeight * 0.5);
            canvas.style.width = excercise.clientWidth;
            canvas.style.height = Math.floor(excercise.clientHeight * 0.5);

            Constants.scr_w = canvas.clientWidth;
            Constants.scr_h = canvas.clientHeight;
        }
        else {
            Constants.scr_w = excercise.clientWidth;
            Constants.scr_h = excercise.clientHeight;
        }


        if (ex !== null)
            ex.draw();

    };

window.onselectstart = function () {
    return false;
};

var t;
var reloaded = false;

function drawFlush() {

    var excercise = (document.getElementsByClassName("excercise"))[0];

    var loader = (document.getElementsByClassName("loader"));
    if (loader.length > 0) {
        loader = loader[0];
        excercise.removeChild(loader);
    }

    var canvas = document.getElementById("canvas");
    if (canvas !== null) {
        canvas.width = excercise.clientWidth;
        canvas.height = Math.floor(excercise.clientHeight * 0.5);
    }
    else {
        Constants.scr_w = excercise.clientWidth;
        Constants.scr_h = excercise.clientHeight;
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
function onLoad(excercise) {
    ex = excercise;

    excercise = (document.getElementsByClassName("excercise"))[0];
    if (Config.target === "web") {
        excercise.style.height = "320px";//for the mobile apps the height must be fullscreen
    }
    else {
        excercise.style.width = "100%";//for the mobile apps the height must be fullscreen
        var upper = (document.getElementsByClassName("upper"))[0];
        upper.style.borderRadius = '0';
        excercise.style.borderRadius = '0';
        (document.getElementsByClassName("playbtn"))[0].style.borderRadius = '0';
        // document.style.background = 'black';
    }

    if (Config.target === "web")
        if (!SoundManager.canPlayAudio())
            return;
    removeStub();
    if (Config.target === "android")
        SoundManager = SoundManagerAndroid;

    if (Config.target === "web")
        SoundManager.init();

    AnimationManager.init();

    SequenceChordTypes.init();

    ResourceLoader.loadAll(loadProgress, drawFlush);
}

function play() {

    if (ex.state === ExcerciseStates.answered)
        ExcerciseFns.setState(ex, ExcerciseStates.pending);

    ex.playTask();
}
