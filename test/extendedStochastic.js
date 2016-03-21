"use strict";

var parser = require('../'),
    should = require('chai').should();

describe('Extended stochastic rule format (ES:x/B:x)', function () {
    describe('parsing', function () {
        it('should support the ESxx:x/Bxx:x format', function () {
            var rule = parser('ES0,12,31:1/B2,34:0.5');

            rule.ruleFormat.should.equal('extended-stochastic');
            rule.ruleString.should.equal('ES0,12,31:1/B2,34:0.5');
            rule.survival.should.deep.equal({ 0: 1, 12: 1, 31: 1 });
            rule.birth.should.deep.equal({ 2: 1, 34: 0.5 });
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should ignore the probability of 0', function () {
            var rule = parser('ES0,12:0,31:1/B2,34:0.5');

            rule.ruleFormat.should.equal('extended-stochastic');
            rule.ruleString.should.equal('ES0,12:0,31:1/B2,34:0.5');
            rule.survival.should.deep.equal({ 0: 1, 31: 1 });
            rule.birth.should.deep.equal({ 2: 1, 34: 0.5 });
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should support the Exx:x/xx:x format', function () {
            var rule = parser('E0,12,31:1/2,34:0.5');

            rule.ruleFormat.should.equal('extended-stochastic');
            rule.ruleString.should.equal('E0,12,31:1/2,34:0.5');
            rule.survival.should.deep.equal({ 0: 1, 12: 1, 31: 1 });
            rule.birth.should.deep.equal({ 2: 1, 34: 0.5 });
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should tolerate whitespaces', function () {
            var rule = parser(' E 0,12, 31 : 1/2,34 :0.5   ');

            rule.ruleFormat.should.equal('extended-stochastic');
            rule.ruleString.should.equal(' E 0,12, 31 : 1/2,34 :0.5   ');
            rule.survival.should.deep.equal({ 0: 1, 12: 1, 31: 1 });
            rule.birth.should.deep.equal({ 2: 1, 34: 0.5 });
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should support the MV extension', function () {
            var rule = parser('E0,12,31:1/2,34:0.5V');

            rule.neighbourhoodType.should.equal('von-neumann');
            rule.neighbourhoodRange.should.equal(1);

            rule = parser('E0,12,31:1/2,34:0.5M13');

            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(13);
        });

        it('should support fulltext neighbourhood type', function () {
            var rule = parser('E0,12,31:1/2,34:0.5von-neumann');

            rule.neighbourhoodType.should.equal('von-neumann');
            rule.neighbourhoodRange.should.equal(1);

            rule = parser('E0,12,31:1/2,34:0.5moore13');

            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(13);
        });

        it('should support the unconventional neighbourhood types axis, corner, edge and face', function () {
            var rule = parser('E0,12,31:1/2,34:0.5axis');

            rule.neighbourhoodType.should.equal('axis');
            rule.neighbourhoodRange.should.equal(1);

            rule = parser('E0,12,31:1/2,34:0.5corner3');

            rule.neighbourhoodType.should.equal('corner');
            rule.neighbourhoodRange.should.equal(3);

            rule = parser('E0,12,31:1/2,34:0.5edge3');

            rule.neighbourhoodType.should.equal('edge');
            rule.neighbourhoodRange.should.equal(3);

            rule = parser('E0,12,31:1/2,34:0.5face3');

            rule.neighbourhoodType.should.equal('face');
            rule.neighbourhoodRange.should.equal(3);
        });

        it('should support ranges', function () {

            var rule = parser('ES0..3/B0,2..4:0.2');

            rule.ruleFormat.should.equal('extended-stochastic');
            rule.ruleString.should.equal('ES0..3/B0,2..4:0.2');

            rule.survival.should.deep.equal({ 0: 1, 1: 1, 2: 1, 3: 1 });
            rule.birth.should.deep.equal({ 0: 1, 2: 0.2, 3: 0.2, 4: 0.2 });
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should support inverted ranges', function () {

            var rule = parser('ES2..1:.1/B6..4');

            rule.ruleFormat.should.equal('extended-stochastic');
            rule.ruleString.should.equal('ES2..1:.1/B6..4');

            rule.survival.should.deep.equal({ 1: 0.1, 2: 0.1 });
            rule.birth.should.deep.equal({ 4: 1, 5: 1, 6: 1 });
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });
    });

    describe('processing', function () {
        it('should process the survival values correctly', function () {
            var rule = parser('ES1,2:1/B');

            rule.process(0, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,1,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(0);
        });

        it('should process the birth values correctly', function () {
            var rule = parser('ES/B1,2:1');

            rule.process(0, [1,0,0,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(0, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(0);
            rule.process(0, [1,1,1,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(0);
        });

        it('should process the combination of survival and birth values correctly', function () {
            var rule = parser('ES1,2:1/B2,3:1');

            rule.process(0, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,1,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(0);
        });

        it('should take into account the probabilities', function () {
            var rule = parser('ES/B0:0.5');

            rule.process(0, [0,0,0,0,0,0,0,0], function riggedRng1() { return 1; }).should.equal(0);
            rule.process(0, [0,0,0,0,0,0,0,0], function riggedRng0() { return 0; }).should.equal(1);

            rule = parser('ES0:0.5/B');

            rule.process(1, [0,0,0,0,0,0,0,0], function riggedRng1() { return 1; }).should.equal(0);
            rule.process(1, [0,0,0,0,0,0,0,0], function riggedRng0() { return 0; }).should.equal(1);
        });
    });
});
