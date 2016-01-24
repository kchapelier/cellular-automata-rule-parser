"use strict";

var parser = require('../'),
    should = require('chai').should();

describe('NLUKY rule format', function () {
    describe('parsing', function () {
        it('should support the NLUKYxxxx format', function () {
            var rule = parser('NLUKY21523');

            rule.ruleFormat.should.equal('nluky');
            rule.ruleString.should.equal('NLUKY21523');
            rule.stateCount.should.equal(2);
            rule.lowBirth.should.equal(1);
            rule.highBirth.should.equal(5);
            rule.lowSurvival.should.equal(2);
            rule.highSurvival.should.equal(3);
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should tolerate whitespaces', function () {
            var rule = parser(' NLUK Y 215 23  ');

            rule.ruleFormat.should.equal('nluky');
            rule.ruleString.should.equal(' NLUK Y 215 23  ');
            rule.stateCount.should.equal(2);
            rule.lowBirth.should.equal(1);
            rule.highBirth.should.equal(5);
            rule.lowSurvival.should.equal(2);
            rule.highSurvival.should.equal(3);
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should accept 9 as a valid value', function () {
            var rule = parser('NLUKY 99999');

            rule.ruleFormat.should.equal('nluky');
            rule.ruleString.should.equal('NLUKY 99999');
            rule.stateCount.should.equal(9);
            rule.lowBirth.should.equal(9);
            rule.highBirth.should.equal(9);
            rule.lowSurvival.should.equal(9);
            rule.highSurvival.should.equal(9);
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });
    });

    describe('processing', function () {
        it('should process the survival values correctly', function () {
            var rule = parser('NLUKY 00023');

            rule.process(0, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(0, [1,1,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,1,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,1,1,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,1,1,0,0,0,0]).should.equal(0);
        });

        it('should process the birth values correctly', function () {
            var rule = parser('NLUKY 02300');

            rule.process(0, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(0, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(0);
            rule.process(0, [1,1,1,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(0);
            rule.process(0, [1,1,1,1,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,1,1,0,0,0,0]).should.equal(0);
        });

        it('should process the combination of survival and birth values correctly', function () {
            var rule = parser('NLUKY 03323');

            rule.process(0, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(0, [1,1,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,1,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,1,1,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,1,1,0,0,0,0]).should.equal(0);
        });

        it('should keep the 1 value if they are in the survival bounds, otherwise decay', function () {
            var rule = parser('NLUKY 23323');

            rule.process(1, [0,0,0,0,0,0,0,0]).should.equal(2); //decay
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(2); //decay
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(1); //survive
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(1); //survive
            rule.process(1, [1,1,1,1,0,0,0,0]).should.equal(2); //decay
        });

        it('should decay the > 1 values no matter what', function () {
            var rule = parser('NLUKY 23323');

            rule.process(2, [0,0,0,0,0,0,0,0]).should.equal(4);
            rule.process(2, [1,0,0,0,0,0,0,0]).should.equal(4);
            rule.process(2, [1,1,0,0,0,0,0,0]).should.equal(4);
            rule.process(2, [1,1,1,0,0,0,0,0]).should.equal(4);

            rule.process(4, [0,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(4, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(4, [1,1,0,0,0,0,0,0]).should.equal(0);
            rule.process(4, [1,1,1,0,0,0,0,0]).should.equal(0);
        });
    });
});
