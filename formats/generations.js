"use strict";

var ruleRegexp = /^S?([0-8]*)\/B?([0-8]*)\/C?([1-9][0-9]*)([MV]?)([0-9]*)$/i;

var stripWhitespaces = function (string) {
    return string.replace(/\s/g, '');
};

var splitStringInNumberArray = function (string) {
    return string.split('').map(function (value) {
        return parseInt(value, 10);
    });
};

var getNeighbourMethod = function (methodId) {
    if (methodId === 'V' || methodId === 'v' || methodId === 'von-neumann') {
        return 'von-neumann';
    } else {
        return 'moore';
    }
};

var parseRuleString = function (ruleString) {
    var extractedRule = ruleRegexp.exec(stripWhitespaces(ruleString));

    return extractedRule ? {
        format: 'generations',
        original: ruleString,
        s: splitStringInNumberArray(extractedRule[1]),
        b: splitStringInNumberArray(extractedRule[2]),
        c: parseInt(extractedRule[3], 10) || 1,
        neighbourMethod: getNeighbourMethod(extractedRule[4]),
        neighbourRange: parseInt(extractedRule[5], 10) || 1
    } : null;
};

var generations = function (rule) {
    return parseRuleString(rule);
};

module.exports = generations;
