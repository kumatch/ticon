var expect = require('chai').expect;
var ticon = require('..');

describe('Ticon', function () {

    it('should create a container', function () {
        var container = ticon();

        expect(container.get).to.be.a('function');
        expect(container.set).to.be.a('function');
        expect(container.register).to.be.a('function');
    });
});