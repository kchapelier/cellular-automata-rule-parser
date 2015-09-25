"use strict";

var parser = require('../'),
    should = require('chai').should();

describe('Life rule format (S/B)', function () {
    describe('parsing', function () {
        it('should support the Sxx/Bxx format', function () {
            var rule = parser('S123/B234');

            rule.ruleFormat.should.equal('life');
            rule.ruleString.should.equal('S123/B234');
            rule.survival.should.deep.equal([1,2,3]);
            rule.birth.should.deep.equal([2,3,4]);
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should support the xx/xx format', function () {
            var rule = parser('123/234');

            rule.ruleFormat.should.equal('life');
            rule.ruleString.should.equal('123/234');
            rule.survival.should.deep.equal([1,2,3]);
            rule.birth.should.deep.equal([2,3,4]);
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should tolerate whitespaces', function () {
            var rule = parser(' 123 / 2 3  4 ');

            rule.ruleFormat.should.equal('life');
            rule.ruleString.should.equal(' 123 / 2 3  4 ');
            rule.survival.should.deep.equal([1,2,3]);
            rule.birth.should.deep.equal([2,3,4]);
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should support the MV extension', function () {
            var rule = parser('S123/B234V');

            rule.neighbourhoodType.should.equal('von-neumann');
            rule.neighbourhoodRange.should.equal(1);

            rule = parser('S123/B234M3');

            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(3);
        });
    });

    describe('processing', function () {
        it('should process the survival values correctly', function () {
            var rule = parser('S12/B');

            rule.process(0, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,1,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(0);
        });

        it('should process the birth values correctly', function () {
            var rule = parser('S/B12');

            rule.process(0, [1,0,0,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(0, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(0);
            rule.process(0, [1,1,1,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(0);
        });



        it('should process the combination of survival and birth values correctly', function () {
            var rule = parser('S12/B23');

            rule.process(0, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,1,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(0);
        });
    });
});
