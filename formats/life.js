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
        format: 'life',
        original: ruleString,
        s: utils.splitStringInNumberArray(extractedRule[1]),
        b: utils.splitStringInNumberArray(extractedRule[2]),
        neighbourMethod: getNeighbourMethod(extractedRule[3]),
        neighbourRange: parseInt(extractedRule[4], 10) || 1
    } : null;
};

var lifeFunction = function (currentValue, neighbours) {
    var result;

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
