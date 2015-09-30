"use strict";

var utils = require('../utils/utils'),
    ruleRegexp = /^(W|Rule)([0-9]{1,3})$/i;

var parseRuleString = function (ruleString) {
    var extractedRule = ruleRegexp.exec(utils.stripWhitespaces(ruleString)),
        ruleNumber = extractedRule ? parseInt(extractedRule[2], 10) : null;

    return extractedRule && ruleNumber >= 0 && ruleNumber <= 255 ? {
        ruleFormat: 'wolfram',
        ruleString: ruleString,
        ruleNumber: ruleNumber,
        neighbourhoodType: 'von-neumann',
        neighbourhoodRange: 1
    } : null;
};

var wolframFunction = function (currentValue, neighbours) {
    var binaryState = (neighbours[0] ? 4 : 0) + (currentValue ? 2 : 0) + (neighbours[1] ? 1 : 0);

    return (this.ruleNumber & Math.pow(2, binaryState) ? 1 : 0);
};

var wolfram = function (rule) {
    var ruleDescription = parseRuleString(rule);

    if (ruleDescription !== null) {
        ruleDescription.process = wolframFunction;
    }

    return ruleDescription;
};

module.exports = wolfram;
