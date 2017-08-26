/**
 * Created by Iwan on 23.08.2017.
 */

require.config({
    baseUrl: "/scripts",
    paths: {
        "$": "../bower_components/jquery/dist/jquery"
    },
    shim: {
        "$": {exports: "jQuery"}
    },
    bundles: {
        "enum": ["Instrument", "Target", "Exercise"]
    }
});

require(["Game"], function (Game) {
    new Game();
});
