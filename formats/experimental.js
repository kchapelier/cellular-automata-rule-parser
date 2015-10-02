"use strict";

var utils = require('../utils/utils'),
    ruleRegexp = /^ES?([0-9,]*)\/B?([0-9,]*)([MV]?)([0-9]*)$/i;

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
        ruleFormat: 'experimental',
        ruleString: ruleString,
        survival: utils.splitCommaSeparatedNumbers(extractedRule[1]),
        birth: utils.splitCommaSeparatedNumbers(extractedRule[2]),
        neighbourhoodType: getNeighbourMethod(extractedRule[3]),
        neighbourhoodRange: parseInt(extractedRule[4], 10) || 1
    } : null;
};

var experimentalFunction = function (currentValue, neighbours) {
    var result,
        sum = neighbours.reduce(function (sum, neighbour) { return sum + neighbour; }, 0);

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
