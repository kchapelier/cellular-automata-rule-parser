"use strict";

var parser = require('../'),
    should = require('chai').should();

describe('Wolfram rule format', function () {
    describe('parsing', function () {
        it('should support the Wxx format', function () {
            var rule = parser('W211');

            rule.ruleFormat.should.equal('wolfram');
            rule.ruleString.should.equal('W211');
            rule.ruleNumber.should.equal(211);
            rule.neighbourhoodType.should.equal('von-neumann');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should support the Rule xx format', function () {
            var rule = parser('Rule 211');

            rule.ruleFormat.should.equal('wolfram');
            rule.ruleString.should.equal('Rule 211');
            rule.ruleNumber.should.deep.equal(211);
            rule.neighbourhoodType.should.equal('von-neumann');
            rule.neighbourhoodRange.should.equal(1);
        });

        it('should tolerate whitespaces', function () {
            var rule = parser('W 2 1  1 ');

            rule.ruleFormat.should.equal('wolfram');
            rule.ruleString.should.equal('W 2 1  1 ');
            rule.ruleNumber.should.deep.equal(211);
            rule.neighbourhoodType.should.equal('von-neumann');
            rule.neighbourhoodRange.should.equal(1);
        });
    });

    describe('processing', function () {
        it('should process the vote values correctly, testing Rule 22', function () {
            var rule = parser('W22');

            rule.process(0, [0,0]).should.equal(0); // 0 0 0
            rule.process(0, [0,1]).should.equal(1); // 0 0 1
            rule.process(1, [0,0]).should.equal(1); // 0 1 0
            rule.process(1, [0,1]).should.equal(0); // 0 1 1
            rule.process(0, [1,0]).should.equal(1); // 1 0 0
            rule.process(0, [1,1]).should.equal(0); // 1 0 1
            rule.process(1, [1,0]).should.equal(0); // 1 1 0
            rule.process(1, [1,1]).should.equal(0); // 1 1 1
        });

        it('should process the vote values correctly, testing Rule 250', function () {
            var rule = parser('W250');

            rule.process(0, [0,0]).should.equal(0); // 0 0 0
            rule.process(0, [0,1]).should.equal(1); // 0 0 1
            rule.process(1, [0,0]).should.equal(0); // 0 1 0
            rule.process(1, [0,1]).should.equal(1); // 0 1 1
            rule.process(0, [1,0]).should.equal(1); // 1 0 0
            rule.process(0, [1,1]).should.equal(1); // 1 0 1
            rule.process(1, [1,0]).should.equal(1); // 1 1 0
            rule.process(1, [1,1]).should.equal(1); // 1 1 1
        });
    });
});
