"use strict";

var parser = require('../'),
    should = require('chai').should();

describe('Extended life rule format (ES/B)', function () {
    describe('parsing', function () {
        it('should support the ESxx/Bxx format', function () {
            var rule = parser('ES0,12,31/B2,34');

            rule.ruleFormat.should.equal('extended-life');
            rule.ruleString.should.equal('ES0,12,31/B2,34');
            rule.survival.should.deep.equal([0,12,31]);
            rule.birth.should.deep.equal([2,34]);
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should support the Exx/xx format', function () {
            var rule = parser('E0,12,31/2,34');

            rule.ruleFormat.should.equal('extended-life');
            rule.ruleString.should.equal('E0,12,31/2,34');
            rule.survival.should.deep.equal([0,12,31]);
            rule.birth.should.deep.equal([2,34]);
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should tolerate whitespaces', function () {
            var rule = parser(' E 0,12,  3 1 / 2, 34 ');

            rule.ruleFormat.should.equal('extended-life');
            rule.ruleString.should.equal(' E 0,12,  3 1 / 2, 34 ');
            rule.survival.should.deep.equal([0,12,31]);
            rule.birth.should.deep.equal([2,34]);
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should support the MV extension', function () {
            var rule = parser('E0,12,31/2,34V');

            rule.neighbourhoodType.should.equal('von-neumann');
            rule.neighbourhoodRange.should.equal(1);

            rule = parser('E0,12,31/2,34M13');

            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(13);
        });

        it('should support fulltext neighbourhood type', function () {
            var rule = parser('E0,12,31/2,34von-neumann');

            rule.neighbourhoodType.should.equal('von-neumann');
            rule.neighbourhoodRange.should.equal(1);

            rule = parser('E0,12,31/2,34moore13');

            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(13);
        });

        it('should support the unconventional neighbourhood types axis, corner, edge and face', function () {
            var rule = parser('E0,12,31/2,34axis');

            rule.neighbourhoodType.should.equal('axis');
            rule.neighbourhoodRange.should.equal(1);

            rule = parser('E0,12,31/2,34corner3');

            rule.neighbourhoodType.should.equal('corner');
            rule.neighbourhoodRange.should.equal(3);

            rule = parser('E0,12,31/2,34edge3');

            rule.neighbourhoodType.should.equal('edge');
            rule.neighbourhoodRange.should.equal(3);

            rule = parser('E0,12,31/2,34face3');

            rule.neighbourhoodType.should.equal('face');
            rule.neighbourhoodRange.should.equal(3);
        });

        it('should support ranges', function () {

            var rule = parser('ES0..3/B0,2..4');

            rule.ruleFormat.should.equal('extended-life');
            rule.ruleString.should.equal('ES0..3/B0,2..4');
            rule.survival.should.deep.equal([0,1,2,3]);
            rule.birth.should.deep.equal([0,2,3,4]);
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should support inverted ranges', function () {

            var rule = parser('ES2..1/B6..4');

            rule.ruleFormat.should.equal('extended-life');
            rule.ruleString.should.equal('ES2..1/B6..4');
            rule.survival.should.deep.equal([1,2]);
            rule.birth.should.deep.equal([4,5,6]);
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });
    });

    describe('processing', function () {
        it('should process the survival values correctly', function () {
            var rule = parser('ES1,2/B');

            rule.process(0, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,1,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(0);
        });

        it('should process the birth values correctly', function () {
            var rule = parser('ES/B1,2');

            rule.process(0, [1,0,0,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(0, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(0);
            rule.process(0, [1,1,1,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(0);
        });

        it('should process the combination of survival and birth values correctly', function () {
            var rule = parser('ES1,2/B2,3');

            rule.process(0, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,1,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(0);
        });
    });
});
