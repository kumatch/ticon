var service = require('./service');

exports.create = function () {

    var services = {};

    var container = {
        set: function (name, instance) {
            services[name] = service().setInstance(instance);

            return this;
        },

        get: function (name) {
            if (!services[name]) {
                return undefined;
            }

            var service = services[name];

            return service.create(this);
        },

        register: function (name, loader) {
            services[name] = service(loader);

            return this;
        }
    };

    return container;
};
