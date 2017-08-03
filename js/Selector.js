var Selectors = {

    excercise: null,

    init: function (i_excercise) {
        this.excercise = i_excercise;
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
                btninc.onclick = this.incKey;
                btndec.onclick = this.decKey;
                value.id = "keyselectorvalue";
                value.textContent = Constants.tone_names[this.excercise.getRoot()];
            }
            else if (selectors[i].className === "levelselector") {
                title.textContent = " Level ";
                btninc.id = "levelinc";
                btndec.id = "leveldec";
                btninc.onclick = this.incLevel;
                btndec.onclick = this.decLevel;
                value.id = "levelselectorvalue";
                value.textContent = this.excercise.getLevel() + 1;
            }
        }
    },

    updateLevel: function () {
        var levename = document.getElementById("levelname");
        levelname.textContent = Selectors.excercise.getLevelName();
        document.getElementById("levelselectorvalue").textContent = Selectors.excercise.getLevel() + 1;
    },

    incLevel: function () {
        Selectors.updateLevel();
        Selectors.excercise.setLevel((Selectors.excercise.getLevel() + 1) % Selectors.excercise.getNumLevels());
        Selectors.excercise.draw();
    },

    decLevel: function () {
        Selectors.updateLevel();
        Selectors.excercise.setLevel((Selectors.excercise.getLevel() + Selectors.excercise.getNumLevels() - 1) % Selectors.excercise.getNumLevels());
        Selectors.excercise.draw();
    },

    incKey: function () {
        Selectors.excercise.setRoot((Selectors.excercise.getRoot() + 1) % Constants.tone_names.length);
        Selectors.excercise.draw();
        document.getElementById("keyselectorvalue").textContent = Constants.tone_names[Selectors.excercise.getRoot()];
    },

    decKey: function () {
        Selectors.excercise.setRoot((Selectors.excercise.getRoot() + Constants.tone_names.length - 1) % Constants.tone_names.length);
        Selectors.excercise.draw();
        document.getElementById("keyselectorvalue").textContent = Constants.tone_names[Selectors.excercise.getRoot()];
    },

    enableKeySelection: function (enable) {
        var keyinc = document.getElementById("keyinc");
        if (keyinc !== null)
            keyinc.disabled = !enable;

        var keydec = document.getElementById("keydec");
        if (keydec !== null)
            keydec.disabled = !enable;
    },

    enableLevelSelection: function (enable) {
        var levelinc = document.getElementById("levelinc");
        if (levelinc !== null)
            levelinc.disabled = !enable;

        var leveldec = document.getElementById("leveldec");
        if (leveldec !== null)
            leveldec.disabled = !enable;
    }
};
