"use strict";

var parser = require('../'),
    should = require('chai').should();

describe('Generations rule format (S/B/C)', function () {
    describe('parsing', function () {
        it('should support the Sxx/Bxx/Cxx format', function () {
            var rule = parser('S123/B234/C345');

            rule.ruleFormat.should.equal('generations');
            rule.ruleString.should.equal('S123/B234/C345');
            rule.survival.should.deep.equal([1,2,3]);
            rule.birth.should.deep.equal([2,3,4]);
            rule.stateCount.should.equal(345);
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should support the xx/xx/xx format', function () {
            var rule = parser('123/234/345');

            rule.ruleFormat.should.equal('generations');
            rule.ruleString.should.equal('123/234/345');
            rule.survival.should.deep.equal([1,2,3]);
            rule.birth.should.deep.equal([2,3,4]);
            rule.stateCount.should.equal(345);
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should tolerate whitespaces', function () {
            var rule = parser(' 123 / 2 3  4 /345 ');

            rule.ruleFormat.should.equal('generations');
            rule.ruleString.should.equal(' 123 / 2 3  4 /345 ');
            rule.survival.should.deep.equal([1,2,3]);
            rule.birth.should.deep.equal([2,3,4]);
            rule.stateCount.should.equal(345);
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should support the MV extension', function () {
            var rule = parser('S123/B234/C345V');

            rule.neighbourhoodType.should.equal('von-neumann');
            rule.neighbourhoodRange.should.equal(1);

            rule = parser('S123/B234/C345M3');

            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(3);
        });
    });

    describe('processing', function () {
        it('should process the survival values correctly', function () {
            var rule = parser('S12/B/C2');

            rule.process(0, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,1,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(0);
        });

        it('should not take values above 1 into account', function () {
            var rule = parser('S1/B1/C2');

            rule.process(1, [2,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [2,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [2,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(0, [2,1,0,0,0,0,0,0]).should.equal(1);
        });

        it('should process the birth values correctly', function () {
            var rule = parser('S/B12/C2');

            rule.process(0, [1,0,0,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(0, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(0);
            rule.process(0, [1,1,1,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(0);
        });

        it('should process the combination of survival and birth values correctly', function () {
            var rule = parser('S12/B23/C2');

            rule.process(0, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,1,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(0);
        });

        it('should keep the 1 value if they are in the survival bounds, otherwise decay', function () {
            var rule = parser('S12/B23/C3');

            rule.process(1, [0,0,0,0,0,0,0,0]).should.equal(2); //decay
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(1); //survive
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(1); //survive
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(2); //decay
        });

        it('should decay the > 1 values no matter what', function () {
            var rule = parser('S12/B23/C4');

            rule.process(2, [0,0,0,0,0,0,0,0]).should.equal(3);
            rule.process(2, [1,0,0,0,0,0,0,0]).should.equal(3);
            rule.process(2, [1,1,0,0,0,0,0,0]).should.equal(3);
            rule.process(2, [1,1,1,0,0,0,0,0]).should.equal(3);

            rule.process(3, [0,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(3, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(3, [1,1,0,0,0,0,0,0]).should.equal(0);
            rule.process(3, [1,1,1,0,0,0,0,0]).should.equal(0);
        });
    });
});
