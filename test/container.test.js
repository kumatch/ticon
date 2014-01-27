var expect = require('chai').expect;
var container = require('../lib/container');

describe('Container', function () {

    it('should get a undefined if not exists service', function () {
        var c = container.create();

        expect(c.get('foo')).to.be.undefined;
    });


    it('should set a instance and get it.', function () {
        var c = container.create();
        var foo = {
            name: function () {
                return "OK 1";
            }
        };

        var bar = function () {
            return "Hello 1";
        };

        c.set('foo', foo);
        c.set('bar', bar);

        expect(c.get('foo').name()).to.equals("OK 1");
        expect(c.get('bar')()).to.equals("Hello 1");
    });


    it('should register a service and get it.', function () {
        var c = container.create();
        var foo_loaded = false;
        var bar_loaded = false;

        c.register('foo', function () {
            foo_loaded = true;

            return {
                name: function () {
                    return "OK 2";
                }
            };
        });

        c.register('bar', function () {
            bar_loaded = true;

            return function () {
                return "Hello 2";
            };
        });

        expect(foo_loaded).to.be.false;
        expect(bar_loaded).to.be.false;

        expect(c.get('foo').name()).to.equals("OK 2");

        expect(foo_loaded).to.be.true;
        expect(bar_loaded).to.be.false;

        expect(c.get('bar')()).to.equals("Hello 2");

        expect(bar_loaded).to.be.true;
    });


    it('should register with injection and get it.', function () {
        var c = container.create();
        var foo_loaded = false;
        var bar_loaded = false;

        c.register('foo', function () {
            foo_loaded = true;

            return {
                name: function () {
                    return "OK 3";
                }
            };
        });

        c.register('bar', function () {
            bar_loaded = true;

            return function () {
                return c.get('foo').name();
            };
        });

        expect(foo_loaded).to.be.false;
        expect(bar_loaded).to.be.false;

        expect(c.get('bar')()).to.equals("OK 3");

        expect(foo_loaded).to.be.true;
        expect(bar_loaded).to.be.true;
    });



    it('should load instance once per service.', function () {
        var c = container.create();
        var foo_count = 0;
        var bar_count = 0;

        c.register('foo', function () {
            foo_count += 1;

            return {
                name: function () {
                    return "OK 4";
                }
            };
        });

        c.register('bar', function () {
            bar_count += 1;

            return function () {
                return c.get('foo').name();
            };
        });

        expect(foo_count).to.equals(0);
        expect(bar_count).to.equals(0);

        expect(c.get('bar')()).to.equals("OK 4");

        expect(foo_count).to.equals(1);
        expect(bar_count).to.equals(1);

        expect(c.get('bar')()).to.equals("OK 4");

        expect(foo_count).to.equals(1);
        expect(bar_count).to.equals(1);
    });
});