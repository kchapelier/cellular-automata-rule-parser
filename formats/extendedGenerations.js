"use strict";

var utils = require('../utils/utils'),
    ruleRegexp = /^ES?([0-9,.]*)\/B?([0-9,.]*)\/C?([1-9][0-9]*)(M|V|von-neumann|moore|axis|corner|edge|face|)([0-9]*)$/i;

var getNeighbourMethod = function (methodId) {
    methodId = methodId.toLowerCase();

    if (methodId === 'v') {
        return 'von-neumann';
    } else if (methodId === 'm' || methodId === ''){
        return 'moore';
    } else {
        return methodId;
    }
};

var parseRuleString = function (ruleString) {
    var extractedRule = ruleRegexp.exec(utils.stripWhitespaces(ruleString));

    return extractedRule ? {
        ruleFormat: 'extended-generations',
        ruleString: ruleString,
        survival: utils.splitCommaSeparatedNumbersWithRanges(extractedRule[1]),
        birth: utils.splitCommaSeparatedNumbersWithRanges(extractedRule[2]),
        stateCount: parseInt(extractedRule[3], 10) || 1,
        neighbourhoodType: getNeighbourMethod(extractedRule[4]),
        neighbourhoodRange: parseInt(extractedRule[5], 10) || 1
    } : null;
};

var extendedGenerationsFunction = function (currentValue, neighbours) {
    var index = 0,
        sum = 0,
        neighboursLength = neighbours.length,
        result;

    for (; index < neighboursLength; index++) {
        sum = sum + (neighbours[index] === 1 ? 1 : 0);
    }

    if (currentValue === 0 && this.birth.indexOf(sum) > -1) {
        result = 1;
    } else if (currentValue === 1 && this.survival.indexOf(sum) > -1) {
        result = 1;
    } else if (currentValue > 0) {
        result = (currentValue + 1) % this.stateCount;
    } else {
        result = 0;
    }

    return result;
};

var extendedGenerations = function (rule) {
    var ruleDescription = parseRuleString(rule);

    if (ruleDescription !== null) {
        ruleDescription.process = extendedGenerationsFunction;
    }

    return ruleDescription;
};

module.exports = extendedGenerations;
