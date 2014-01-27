module.exports = function (loader) {
    return (function () {
        var instance, spec;

        return {
            create: function () {
                if (!instance) {
                    instance = loader();
                }

                return instance;
            },

            setInstance: function (v) {
                instance = v;

                return this;
            }
        };
    })();
};
