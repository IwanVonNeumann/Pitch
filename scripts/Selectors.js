define("Selectors", ["Constants"], function (Constants) {

    var Selectors = function (exercise) {
        this.exercise = exercise;

        var selectors = document.getElementsByName("selector");
        for (var i = 0; i < selectors.length; ++i) {
            //var title = document.createElement("span");
            var title = document.createElement("span");
            title.className = "selectortitle";

            var btninc = document.createElement("button");
            btninc.className = "selectorbtn";
            btninc.textContent = '\u25B6';

            var btndec = document.createElement("button");
            btndec.className = "selectorbtn";
            btndec.textContent = '\u25C0';

            var value = document.createElement("span");
            value.className = "selectorvalue";
            selectors[i].appendChild(title);
            selectors[i].appendChild(btndec);
            selectors[i].appendChild(value);
            selectors[i].appendChild(btninc);

            if (selectors[i].className === "keyselector") {
                title.textContent = " Key ";
                btninc.id = "keyinc";
                btndec.id = "keydec";
                btninc.onclick = this.incKey.bind(this);
                btndec.onclick = this.decKey.bind(this);
                value.id = "keyselectorvalue";
                value.textContent = Constants.tone_names[this.exercise.getRoot()];
            }
            else if (selectors[i].className === "levelselector") {
                title.textContent = " Level ";
                btninc.id = "levelinc";
                btndec.id = "leveldec";
                btninc.onclick = this.incLevel.bind(this);
                btndec.onclick = this.decLevel.bind(this);
                value.id = "levelselectorvalue";
                value.textContent = this.exercise.getLevel() + 1;
            }
        }
    };

    Selectors.prototype.updateLevel = function () {
        var levelName = document.getElementById("levelname");
        levelName.textContent = this.exercise.getLevelName();
        document.getElementById("levelselectorvalue").textContent = this.exercise.getLevel() + 1;
    };

    Selectors.prototype.incLevel = function () {
        this.updateLevel();
        this.exercise.setLevel((this.exercise.getLevel() + 1) % this.exercise.getNumLevels());
        this.exercise.draw();
    };

    Selectors.prototype.decLevel = function () {
        this.updateLevel();
        this.exercise.setLevel((this.exercise.getLevel() + this.exercise.getNumLevels() - 1) % this.exercise.getNumLevels());
        this.exercise.draw();
    };

    Selectors.prototype.incKey = function () {
        this.exercise.setRoot((this.exercise.getRoot() + 1) % Constants.tone_names.length);
        this.exercise.draw();
        document.getElementById("keyselectorvalue").textContent = Constants.tone_names[this.exercise.getRoot()];
    };

    Selectors.prototype.decKey = function () {
        this.exercise.setRoot((this.exercise.getRoot() + Constants.tone_names.length - 1) % Constants.tone_names.length);
        this.exercise.draw();
        document.getElementById("keyselectorvalue").textContent = Constants.tone_names[this.exercise.getRoot()];
    };

    Selectors.prototype.enableKeySelection = function (enable) {
        var keyinc = document.getElementById("keyinc");
        if (keyinc !== null)
            keyinc.disabled = !enable;

        var keydec = document.getElementById("keydec");
        if (keydec !== null)
            keydec.disabled = !enable;
    };

    Selectors.prototype.enableLevelSelection = function (enable) {
        var levelinc = document.getElementById("levelinc");
        if (levelinc !== null)
            levelinc.disabled = !enable;

        var leveldec = document.getElementById("leveldec");
        if (leveldec !== null)
            leveldec.disabled = !enable;
    };

    return Selectors;
});
