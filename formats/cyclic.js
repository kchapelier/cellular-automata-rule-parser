"use strict";

var utils = require('../utils/utils'),
    ruleRegexp = /^R([1-9][0-9]*)\/T([0-9]+)\/C([1-9][0-9]*)\/(NM|NN)(\/GH|)$/i;

//actually not the same as in life and generations
var getNeighbourMethod = function (methodId) {
    if (methodId === 'NN' || methodId === 'nn' || methodId === 'von-neumann') {
        return 'von-neumann';
    } else {
        return 'moore';
    }
};

var parseRuleString = function (ruleString) {
    var extractedRule = ruleRegexp.exec(utils.stripWhitespaces(ruleString));

    return extractedRule ? {
        ruleFormat: 'cyclic',
        ruleString: ruleString,
        threshold: parseInt(extractedRule[2], 10),
        stateCount: parseInt(extractedRule[3], 10),
        greenbergHastingsModel: (!!extractedRule[5]),
        neighbourhoodType: getNeighbourMethod(extractedRule[4]),
        neighbourhoodRange: parseInt(extractedRule[1], 10) || 1
    } : null;
};

var cyclicFunction = function (currentValue, neighbours) {
    var result,
        nextValue = (currentValue + 1) % this.stateCount,
        sum = neighbours.reduce(function (sum, neighbour) { return sum + (neighbour === nextValue ? 1 : 0); }, 0);

    if (sum >= this.threshold || (this.greenbergHastingsModel && currentValue !== 0)) {
        result = nextValue;
    } else {
        result = currentValue;
    }

    return result;
};

var cyclic = function (rule) {
    var ruleDescription = parseRuleString(rule);

    if (ruleDescription !== null) {
        ruleDescription.process = cyclicFunction;
    }

    return ruleDescription;
};

module.exports = cyclic;
