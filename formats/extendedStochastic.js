"use strict";

var utils = require('../utils/utils'),
    ruleRegexp = /^ES?([0-9,.:]*)\/B?([0-9,.:]*)(M|V|von-neumann|moore|axis|corner|edge|face|)([0-9]*)$/i;

var getNeighbourMethod = function (methodId) {
    methodId = methodId.toLowerCase();

    if (methodId === 'v') {
        return 'von-neumann';
    } else if (methodId === 'm' || methodId === ''){
        return 'moore';
    } else {
        return methodId;
    }
};

var regexRange = /([0-9]+)\.\.([0-9]+)/,
    regexProbability = /([0-9.]+):([0-9.]+)/;

var parseStochasticArgs = function (string) {
    //TODO refactor to utils along with splitCommaSeparatedNumbersWithRanges

    var splitString = string.split(','),
        result = {},
        expression,
        rangeMatch,
        probabilityMatch,
        probability,
        i = 0;

    for (; i < splitString.length; i++) {
        expression = splitString[i];
        rangeMatch = regexRange.exec(expression);
        probabilityMatch = regexProbability.exec(expression);

        probability = probabilityMatch ? parseFloat(probabilityMatch[2]) : 1;
        probability = Math.max(0, Math.min(1, probability));

        if (probability > 0 || isNaN(probability)) {
            if (rangeMatch) {
                utils.appendRangeToObjectWithProbability(parseInt(rangeMatch[1], 10), parseInt(rangeMatch[2], 10), probability, result);
            } else {
                result[parseInt(expression, 10)] = probability;
            }
        }
    }

    return result;
};

var parseRuleString = function (ruleString) {
    var extractedRule = ruleRegexp.exec(utils.stripWhitespaces(ruleString));

    return extractedRule ? {
        ruleFormat: 'extended-stochastic',
        ruleString: ruleString,
        survival: parseStochasticArgs(extractedRule[1]), //utils.splitCommaSeparatedNumbersWithRanges(extractedRule[1]),
        birth: parseStochasticArgs(extractedRule[2]), //utils.splitCommaSeparatedNumbersWithRanges(extractedRule[2]),
        neighbourhoodType: getNeighbourMethod(extractedRule[3]),
        neighbourhoodRange: parseInt(extractedRule[4], 10) || 1
    } : null;
};

var extendedStochasticFunction = function (currentValue, neighbours) {
    var index = 0,
        sum = 0,
        neighboursLength = neighbours.length,
        result;

    var rng = Math.random();

    for (; index < neighboursLength; index++) {
        sum = sum + neighbours[index];
    }

    if (currentValue === 0 && !!this.birth[sum]) {
        result = (this.birth[sum] === 1 || this.birth[sum] < rng()) ? 1 : 0;
    } else if (currentValue === 1 && !!this.survival[sum]) {
        result = (this.survival[sum] === 1 || this.survival[sum] < rng()) ? 1 : 0;
    } else {
        result = 0;
    }

    return result;
};

var extendedLife = function (rule) {
    var ruleDescription = parseRuleString(rule);

    if (ruleDescription !== null) {
        ruleDescription.process = extendedStochasticFunction;
    }

    return ruleDescription;
};

module.exports = extendedLife;
