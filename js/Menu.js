/**
 * Created by Iwan on 09.08.2017.
 */

$(document).ready(function () {

    var $exerciseContainer = $(".exercises-container");

    var $selectExMelody = $(".js-select-ex-melody");
    var $selectExRelative = $(".js-select-ex-relative");
    var $selectExPerfect = $(".js-select-ex-perfect");
    var $selectExProgressions = $(".js-select-ex-progressions");
    var $selectExChords = $(".js-select-ex-chords");

    var $selectInsPiano = $(".js-select-ins-piano");
    var $selectInsGuitar = $(".js-select-ins-guitar");
    var $selectInsViolin = $(".js-select-ins-violin");


    function selectExMelody() {
        deselectAllExercises();
        $selectExMelody.addClass("selected");
        $exerciseContainer.load("ex_Melody.html", function () {
            onLoad(exerciseMelody);
        });
    }

    function selectExRelative() {
        deselectAllExercises();
        $selectExRelative.addClass("selected");
        $exerciseContainer.load("ex_Relative.html", function () {
            onLoad(exerciseIntervals);
        });
    }

    function selectExPerfect() {
        deselectAllExercises();
        $selectExPerfect.addClass("selected");
        $exerciseContainer.load("ex_Perfect.html", function () {
            onLoad(exercisePerfect);
        });
    }

    function selectExProgressions() {
        deselectAllExercises();
        $selectExProgressions.addClass("selected");
        $exerciseContainer.load("ex_Progressions.html", function () {
            onLoad(exerciseChords);
        });
    }

    function selectExChords() {
        deselectAllExercises();
        $selectExChords.addClass("selected");
        $exerciseContainer.load("ex_Chords.html", function () {
            onLoad(exerciseChordTypes);
        });
    }

    function deselectAllExercises() {
        $(".js-select-ex").removeClass("selected");
    }

    function selectInsPiano() {
        deselectAllInstruments();
        $selectInsPiano.addClass("selected");
        Config.instrument = "piano";
        SoundManager.init(); // TODO fix
    }

    function selectInsGuitar() {
        deselectAllInstruments();
        $selectInsGuitar.addClass("selected");
        Config.instrument = "guitar";
        SoundManager.init(); // TODO fix
    }

    function selectInsViolin() {
        deselectAllInstruments();
        $selectInsViolin.addClass("selected");
        Config.instrument = "violin";
        SoundManager.init(); // TODO fix
    }

    function deselectAllInstruments() {
        $(".js-select-ins").removeClass("selected");
    }


    $selectExMelody.click(selectExMelody);
    $selectExRelative.click(selectExRelative);
    $selectExPerfect.click(selectExPerfect);
    $selectExProgressions.click(selectExProgressions);
    $selectExChords.click(selectExChords);

    $selectInsPiano.click(selectInsPiano);
    $selectInsGuitar.click(selectInsGuitar);
    $selectInsViolin.click(selectInsViolin);

    selectExMelody();
    // selectInsPiano();
    selectInsViolin();
});
