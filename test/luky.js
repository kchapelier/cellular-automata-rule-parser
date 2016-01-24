"use strict";

var parser = require('../'),
    should = require('chai').should();

describe('LUKY rule format', function () {
    describe('parsing', function () {
        it('should support the LUKYxxxx format', function () {
            var rule = parser('LUKY1523');

            rule.ruleFormat.should.equal('luky');
            rule.ruleString.should.equal('LUKY1523');
            rule.lowBirth.should.equal(1);
            rule.highBirth.should.equal(5);
            rule.lowSurvival.should.equal(2);
            rule.highSurvival.should.equal(3);
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should tolerate whitespaces', function () {
            var rule = parser(' LUK Y 15 23  ');

            rule.ruleFormat.should.equal('luky');
            rule.ruleString.should.equal(' LUK Y 15 23  ');
            rule.lowBirth.should.equal(1);
            rule.highBirth.should.equal(5);
            rule.lowSurvival.should.equal(2);
            rule.highSurvival.should.equal(3);
            rule.neighbourhoodType.should.equal('moore');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should accept 9 as a valid value', function () {
            var rule = parser('LUKY 9999');

            rule.ruleFormat.should.equal('luky');
            rule.ruleString.should.equal('LUKY 9999');
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
            var rule = parser('LUKY 0023');

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
            var rule = parser('LUKY 2300');

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
            var rule = parser('LUKY 3323');

            rule.process(0, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,0,0,0,0,0,0,0]).should.equal(0);
            rule.process(0, [1,1,0,0,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,0,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,1,0,0,0,0,0]).should.equal(1);
            rule.process(1, [1,1,1,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,1,1,0,0,0,0]).should.equal(0);
            rule.process(1, [1,1,1,1,0,0,0,0]).should.equal(0);
        });
    });
});
