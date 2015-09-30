"use strict";

var parser = require('../'),
    should = require('chai').should();

describe('Vote for life rule format', function () {
    describe('parsing', function () {
        it('should support the xx format', function () {
            var rule = parser('234');

            rule.ruleFormat.should.equal('vote');
            rule.ruleString.should.equal('234');
            rule.vote.should.deep.equal([2,3,4]);
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should tolerate whitespaces', function () {
            var rule = parser(' 2 3  4 ');

            rule.ruleFormat.should.equal('vote');
            rule.ruleString.should.equal(' 2 3  4 ');
            rule.vote.should.deep.equal([2,3,4]);
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should support the MV extension', function () {
            var rule = parser('234V');

            rule.neighbourhoodType.should.equal('von-neumann');
            rule.neighbourhoodRange.should.equal(1);

            rule = parser('234M3');

            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(3);
        });
    });

    describe('processing', function () {
        it('should process the vote values correctly', function () {
            var rule = parser('12');

            rule.process(0, [0,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [0,0,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,0,0,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(0);
            rule.process(0, [1,1,1,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(0);
        });
    });
});
