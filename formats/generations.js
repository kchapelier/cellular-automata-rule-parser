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
        format: 'generations',
        original: ruleString,
        s: utils.splitStringInNumberArray(extractedRule[1]),
        b: utils.splitStringInNumberArray(extractedRule[2]),
        c: parseInt(extractedRule[3], 10) || 1,
        neighbourMethod: getNeighbourMethod(extractedRule[4]),
        neighbourRange: parseInt(extractedRule[5], 10) || 1
    } : null;
};

var generations = function (rule) {
    return parseRuleString(rule);
};

module.exports = generations;
