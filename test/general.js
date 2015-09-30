"use strict";

var parser = require('../'),
    should = require('chai').should();

describe('General', function () {
    describe('parsing', function () {
        it('should always return null for invalid rules', function () {
            should.equal(parser(''), null);
            should.equal(parser('TEST'), null);
            should.equal(parser(null), null);
        });

        it('should return null for valid rules if the expected format is not the correct one', function () {
            should.equal(parser('S23/B3', 'cyclic'), null);
        });

        it('should return if the expected format does not exist', function () {
            should.equal(parser('S23/B3', 'invalidformat'), null);
        });
    });
});
