"use strict";

var utils = require('../utils/utils'),
    ruleRegexp = /^NLUKY([0-9])([0-9])([0-9])([0-9])([0-9])$/i;

var parseRuleString = function (ruleString) {
    var extractedRule = ruleRegexp.exec(utils.stripWhitespaces(ruleString));

    return extractedRule ? {
        ruleFormat: 'nluky',
        ruleString: ruleString,
        stateCount: parseInt(extractedRule[1], 10),
        lowBirth: parseInt(extractedRule[2], 10),
        highBirth: parseInt(extractedRule[3], 10),
        lowSurvival: parseInt(extractedRule[4], 10),
        highSurvival: parseInt(extractedRule[5], 10),
        neighbourhoodType: 'moore',
        neighbourhoodRange: 1
    } : null;
};

var nlukyFunction = function (currentValue, neighbours) {
    var index = 0,
        sum = 0,
        neighboursLength = neighbours.length,
        result;

    for (; index < neighboursLength; index++) {
        sum = sum + (neighbours[index] === 1 ? 1 : 0);
    }

    if (currentValue === 0 && sum >= this.lowBirth && sum <= this.highBirth) {
        result = 1;
    } else if (currentValue === 1 && sum >= this.lowSurvival && sum <= this.highSurvival) {
        result = 1;
    } else if (currentValue === 1) {
        result = 2 % (2 + this.stateCount * 2);
    } else if (currentValue >= 2) {
        result = (currentValue + 2) % (2 + this.stateCount * 2);
    } else {
        result = 0;
    }

    return result;
};

var generations = function (rule) {
    var ruleDescription = parseRuleString(rule);

    if (ruleDescription !== null) {
        ruleDescription.process = nlukyFunction;
    }

    return ruleDescription;
};

module.exports = generations;
