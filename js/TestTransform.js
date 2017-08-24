/**
 * Created by Iwan on 23.08.2017.
 */

define("TestTransform", ["TestObject"], function (TestObject) {

    console.log("require.TestTransform");

    TestObject.sqrt6 = "no";

    return {
        transform: "ok"
    };
});