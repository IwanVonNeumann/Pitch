/**
 * Created by Iwan on 23.08.2017.
 */

define("TestObject", ["Test"], function (Test) {

    console.log("require.TestObject");
    console.log("test:", Test.test);

    return {
        sqrt6: "yo"
    };
});
