/**
 * Created by Iwan on 23.08.2017.
 */

define("Test", ["TestObject", "TestTransform"], function (TestObject, TestTransform) {

    console.log("require.Test");

    console.log("transform:", TestTransform.transform);
    console.log("sqrt(6):", TestObject.sqrt6);

    return {
        test: "yes"
    };
});
