/**
 * Created by Iwan on 29.08.2017.
 */

"use strict";

define("InstrumentMenuView",
    ["jquery", "underscore", "backbone", "marionette",
        "text", "text!InstrumentMenuTemplate", "EventBus", "Config", "Instrument"],
    function ($, _, Backbone, Marionette, text, InstrumentMenuTemplate, EventBus, Config, Instrument) {

        return Marionette.View.extend({

            initialize: function () {
                EventBus.bind("instrument:set", function (name) {
                    this.selectInstrument(name);
                }, this);
            },

            tagName: "ul",
            className: "instrument-menu",
            template: _.template(InstrumentMenuTemplate),

            onRender: function () {
                this.selectInstrument(Config.instrument);
            },

            events: {
                "click .js-select-ins-piano": "selectInsPiano",
                "click .js-select-ins-guitar": "selectInsGuitar",
                "click .js-select-ins-violin": "selectInsViolin"
            },

            selectInsPiano: function () {
                EventBus.trigger("instrument:set", Instrument.PIANO);
            },

            selectInsGuitar: function () {
                EventBus.trigger("instrument:set", Instrument.GUITAR);
            },

            selectInsViolin: function () {
                EventBus.trigger("instrument:set", Instrument.VIOLIN);
            },

            selectInstrument: function (name) {
                this.deselectAllInstruments();

                var $INSTRUMENT_BUTTON = {};
                $INSTRUMENT_BUTTON[Instrument.PIANO] = ".js-select-ins-piano";
                $INSTRUMENT_BUTTON[Instrument.GUITAR] = ".js-select-ins-guitar";
                $INSTRUMENT_BUTTON[Instrument.VIOLIN] = ".js-select-ins-violin";

                var instrumentButton = $INSTRUMENT_BUTTON[name];

                this.$el.find(instrumentButton).addClass("selected");
            },

            deselectAllInstruments: function () {
                $(".js-select-ins").removeClass("selected");
            }
        });
    }
);
