module.exports = function (loader) {
    return (function () {
        var instance;
        var loaded = false;

        return {
            create: function () {
                if (loaded === false) {
                    instance = loader();
                    loaded = true;
                }

                return instance;
            },

            setInstance: function (v) {
                instance = v;
                loaded = true;

                return this;
            }
        };
    })();
};
