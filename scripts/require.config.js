/**
 * Created by Iwan on 23.08.2017.
 */

require.config({
    baseUrl: "/scripts",
    paths: {
        "jquery": "../bower_components/jquery/dist/jquery",
        "underscore": "../bower_components/underscore/underscore",
        "text": "../bower_components/text/text",
        "backbone": "../bower_components/backbone/backbone",
        "backbone.radio": "../bower_components/backbone.radio/build/backbone.radio",
        "backbone.events": "../bower_components/backbone-events-standalone/backbone-events-standalone",
        "marionette": "../bower_components/backbone.marionette/lib/backbone.marionette",

        "GameApplication": "game/GameApplication",
        "GameView": "game/GameView",
        "GameTemplate": "game/Game.html",

        "ExerciseMenuView": "exercise-menu/ExerciseMenuView",
        "ExerciseMenuTemplate": "exercise-menu/ExerciseMenu.html",

        "InstrumentMenuView": "instrument-menu/InstrumentMenuView",
        "InstrumentMenuTemplate": "instrument-menu/InstrumentMenu.html",

        "ExerciseView": "exercise/ExerciseView",
        "ExerciseMelodyView": "exercise/ExerciseMelodyView",
        "ExerciseMelodyTemplate": "exercise/ExerciseMelody.html",
        "ExerciseMelody": "exercise/ExerciseMelody"
    },
    shim: {
        backbone: {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        }
    },
    bundles: {
        "enum": ["Instrument", "Target", "Exercise"]
    }
});

require(["GameApplication"]);
