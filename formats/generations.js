"use strict";

var utils = require('../utils/utils'),
    ruleRegexp = /^S?([0-8]*)\/B?([0-8]*)\/C?([1-9][0-9]*)([MV]?)([0-9]*)$/i;

var getNeighbourMethod = function (methodId) {
    if (methodId === 'V' || methodId === 'v' || methodId === 'von-neumann') {
        return 'von-neumann';
    } else {
        return 'moore';
    }
};

var parseRuleString = function (ruleString) {
    var extractedRule = ruleRegexp.exec(utils.stripWhitespaces(ruleString));

    return extractedRule ? {
        ruleFormat: 'generations',
        ruleString: ruleString,
        survival: utils.splitStringInNumberArray(extractedRule[1]),
        birth: utils.splitStringInNumberArray(extractedRule[2]),
        stateCount: parseInt(extractedRule[3], 10) || 1,
        neighbourhoodType: getNeighbourMethod(extractedRule[4]),
        neighbourhoodRange: parseInt(extractedRule[5], 10) || 1
    } : null;
};

var generationsFunction = function (currentValue, neighbours) {
    var result,
        sum = neighbours.reduce(function (sum, neighbour) { return sum + (neighbour === 1 ? 1 : 0); }, 0);

    if (currentValue === 0 && this.birth.indexOf(sum) > -1) {
        result = 1;
    } else if (currentValue === 1 && this.survival.indexOf(sum) > -1) {
        result = 1;
    } else if (currentValue > 0) {
        result = (currentValue + 1) % this.stateCount;
    }

    return result;
};

var generations = function (rule) {
    var ruleDescription = parseRuleString(rule);

    if (ruleDescription !== null) {
        ruleDescription.process = generationsFunction;
    }

    return ruleDescription;
};

module.exports = generations;
