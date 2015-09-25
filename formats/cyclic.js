"use strict";

var utils = require('../utils/utils'),
    ruleRegexp = /^R([1-9][0-9]*)\/T([0-9]+)\/C([1-9][0-9]*)\/(NM|NN)$/i;

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
    var extractedRule = ruleRegexp.exec(utils.stripWhitespaces(ruleString));

    return extractedRule ? {
        ruleFormat: 'cyclic',
        ruleString: ruleString,
        threshold: parseInt(extractedRule[2], 10),
        stateCount: parseInt(extractedRule[3], 10),
        neighbourhoodType: getNeighbourMethod(extractedRule[4]),
        neighbourhoodRange: parseInt(extractedRule[1], 10) || 1
    } : null;
};

var cyclic = function (rule) {
    return parseRuleString(rule);
};

module.exports = cyclic;
