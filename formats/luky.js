"use strict";

var utils = require('../utils/utils'),
    ruleRegexp = /^LUKY([0-8])([0-8])([0-8])([0-8])$/i;

var parseRuleString = function (ruleString) {
    var extractedRule = ruleRegexp.exec(utils.stripWhitespaces(ruleString));

    return extractedRule ? {
        ruleFormat: 'luky',
        ruleString: ruleString,
        lowBirth: parseInt(extractedRule[1], 10),
        highBirth: parseInt(extractedRule[2], 10),
        lowSurvival: parseInt(extractedRule[3], 10),
        highSurvival: parseInt(extractedRule[4], 10),
        neighbourhoodType: 'moore',
        neighbourhoodRange: 1
    } : null;
};

var lukyFunction = function (currentValue, neighbours) {
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
    } else {
        result = 0;
    }

    return result;
};

var generations = function (rule) {
    var ruleDescription = parseRuleString(rule);

    if (ruleDescription !== null) {
        ruleDescription.process = lukyFunction;
    }

    return ruleDescription;
};

module.exports = generations;
