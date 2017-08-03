var RandomUtil = {

    count: 0,

    getValue: function () {
        ret = Math.floor(Math.random() * 1000000);
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
