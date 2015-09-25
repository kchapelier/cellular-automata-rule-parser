"use strict";

var utils = require('../utils/utils'),
    ruleRegexp = /^S?([0-8]*)\/B?([0-8]*)([MV]?)([0-9]*)$/i;

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
        ruleFormat: 'life',
        ruleString: ruleString,
        survival: utils.splitStringInNumberArray(extractedRule[1]),
        birth: utils.splitStringInNumberArray(extractedRule[2]),
        neighbourhoodType: getNeighbourMethod(extractedRule[3]),
        neighbourhoodRange: parseInt(extractedRule[4], 10) || 1
    } : null;
};

var lifeFunction = function (currentValue, neighbours) {
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

var life = function (rule) {
    var ruleDescription = parseRuleString(rule);

    if (ruleDescription !== null) {
        ruleDescription.process = lifeFunction;
    }

    return ruleDescription;
};

module.exports = life;
