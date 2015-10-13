"use strict";

var utils = require('../utils/utils'),
    ruleRegexp = /^ES?([0-9,.]*)\/B?([0-9,.]*)([MV]?)([0-9]*)$/i;

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
        ruleFormat: 'extended',
        ruleString: ruleString,
        survival: utils.splitCommaSeparatedNumbersWithRanges(extractedRule[1]),
        birth: utils.splitCommaSeparatedNumbersWithRanges(extractedRule[2]),
        neighbourhoodType: getNeighbourMethod(extractedRule[3]),
        neighbourhoodRange: parseInt(extractedRule[4], 10) || 1
    } : null;
};

var experimentalFunction = function (currentValue, neighbours) {
    var index = 0,
        sum = 0,
        neighboursLength = neighbours.length,
        result;

    for (; index < neighboursLength; index++) {
        sum = sum + neighbours[index];
    }

    if (currentValue === 0 && this.birth.indexOf(sum) > -1) {
        result = 1;
    } else if (currentValue === 1 && this.survival.indexOf(sum) > -1) {
        result = 1;
    } else {
        result = 0;
    }

    return result;
};

var experimental = function (rule) {
    var ruleDescription = parseRuleString(rule);

    if (ruleDescription !== null) {
        ruleDescription.process = experimentalFunction;
    }

    return ruleDescription;
};

module.exports = experimental;
