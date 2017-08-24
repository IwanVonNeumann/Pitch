/**
 * Created by Iwan on 23.08.2017.
 */

require.config({
    baseUrl: "/js",
    paths: {
        "$": "../bower_components/jquery/dist/jquery"
    },
    shim: {
        "$": {exports: "jQuery"}
    }
});

require(["Menu"]);
// require(["Test"]);
