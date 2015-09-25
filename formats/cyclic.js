"use strict";

var ruleRegexp = /^R?([1-9][0-9]*)\/T?([0-9]+)\/C?([1-9][0-9]*)\/(NM|NN)$/i;

var stripWhitespaces = function (string) {
    return string.replace(/\s/g, '');
};

//actually not the same as in life and generations
//TODO support Greenberg-Hastings model ?
var getNeighbourMethod = function (methodId) {
    if (methodId === 'NN' || methodId === 'nn' || methodId === 'von-neumann') {
        return 'von-neumann';
    } else {
        return 'moore';
    }
};

var parseRuleString = function (ruleString) {
    var extractedRule = ruleRegexp.exec(stripWhitespaces(ruleString));

    return extractedRule ? {
        format: 'cyclic',
        original: ruleString,
        t: parseInt(extractedRule[2], 10),
        c: parseInt(extractedRule[3], 10),
        neighbourMethod: getNeighbourMethod(extractedRule[4]),
        neighbourRange: parseInt(extractedRule[1], 10) || 1
    } : null;
};

var cyclic = function (rule) {
    return parseRuleString(rule);
};

module.exports = cyclic;
