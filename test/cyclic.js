"use strict";

var parser = require('../'),
    should = require('chai').should();

describe('Cyclic rule format (R/T/C/N)', function () {
    describe('parsing', function () {
        it('should support the Rxx/Txx/Cxx/Nx format', function () {
            var rule = parser('R2/T6/C3/NN');

            rule.ruleFormat.should.equal('cyclic');
            rule.ruleString.should.equal('R2/T6/C3/NN');
            rule.threshold.should.deep.equal(6);
            rule.stateCount.should.equal(3);
            rule.neighbourhoodType.should.equal('von-neumann');
            rule.neighbourhoodRange.should.equal(2);
        });

        it('should tolerate whitespaces', function () {
            var rule = parser(' R2 / T6/ C 3/ NN');

            rule.ruleFormat.should.equal('cyclic');
            rule.ruleString.should.equal(' R2 / T6/ C 3/ NN');
            rule.threshold.should.deep.equal(6);
            rule.stateCount.should.equal(3);
            rule.neighbourhoodType.should.equal('von-neumann');
            rule.neighbourhoodRange.should.equal(2);
        });
    });

    describe('processing', function () {
        it('should increase the value if the number of neighbours with the next value is >= to the threshold', function () {
            var rule = parser('R1/T3/C3/NM');

            rule.process(0, [1,1,0,0,0,0,0,0]).should.equal(0);
            rule.process(0, [1,1,1,0,0,0,0,0]).should.equal(1);
            rule.process(0, [1,1,1,1,0,0,0,0]).should.equal(1);

            rule.process(1, [2,2,0,0,0,0,0,0]).should.equal(1);
            rule.process(1, [2,2,2,0,0,0,0,0]).should.equal(2);
            rule.process(1, [2,2,2,2,0,0,0,0]).should.equal(2);

            rule.process(2, [0,0,1,1,1,1,1,1]).should.equal(2);
            rule.process(2, [0,0,0,1,1,1,1,1]).should.equal(0);
            rule.process(2, [0,0,0,0,1,1,1,1]).should.equal(0);
        });
    });
});
