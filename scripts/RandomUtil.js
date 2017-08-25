define("RandomUtil", function () {

    return {
        count: 0,

        // TODO review this method
        getValue: function () {
            var ret = Math.floor(Math.random() * 1000000);
            if (ret < 0)
                ret = -ret;
            return ret;
        },

        getNormalised: function () {
            return Math.random();
        },

        getMod: function (mod) {
            var ret = this.getValue() % mod;
            if (this.count < 100) {
                ++this.count;
            }
            return ret;
        }
    };
});
