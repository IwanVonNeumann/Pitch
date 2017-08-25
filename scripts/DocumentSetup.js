/**
 * Created by Iwan on 23.08.2017.
 */

define("DocumentSetup",
    ["Config", "Constants", "Target", "Board", "SoundManager"],
    function (Config, Constants, Target, Board, SoundManager) {

        if ('undefined' !== typeof SoundManagerAndroid)
            Config.target = Target.ANDROID;
        else {
            Config.target = Target.WEB;
        }

        function touchDown(e) {
            var ev = e.touches[0];
            Board.exercise.mouseDown(ev.clientX, ev.clientY);
        }

        function touchUp() {
            Board.exercise.mouseUp();
        }

        function mouseDown(e) {
            Board.exercise.mouseDown(e.clientX, e.clientY);
        }

        function mouseUp(e) {
            Board.exercise.mouseUp(e.clientX, e.clientY);
        }

        if (Config.target === Target.WEB) {
            document.onmousedown = mouseDown;
            document.onmouseup = mouseUp;
        } else {
            document.ontouchstart = touchDown;
            document.ontouchend = touchUp;
        }

        window.onselectstart = function () {
            return false;
        };

        if (Config.target === Target.WEB)
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
                } else {
                    Constants.scr_w = exercise.clientWidth;
                    Constants.scr_h = exercise.clientHeight;
                }

                if (Board.exercise)
                    Board.exercise.draw();
            };
    }
);
