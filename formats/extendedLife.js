"use strict";

var utils = require('../utils/utils'),
    ruleRegexp = /^ES?([0-9,.]*)\/B?([0-9,.]*)(M|V|von-neumann|moore|axis|corner|edge|face|)([0-9]*)$/i;

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

var parseRuleString = function (ruleString) {
    var extractedRule = ruleRegexp.exec(utils.stripWhitespaces(ruleString));

    return extractedRule ? {
        ruleFormat: 'extended-life',
        ruleString: ruleString,
        survival: utils.splitCommaSeparatedNumbersWithRanges(extractedRule[1]),
        birth: utils.splitCommaSeparatedNumbersWithRanges(extractedRule[2]),
        neighbourhoodType: getNeighbourMethod(extractedRule[3]),
        neighbourhoodRange: parseInt(extractedRule[4], 10) || 1
    } : null;
};

var extendedLifeFunction = function (currentValue, neighbours) {
    var index = 0,
        sum = 0,
        neighboursLength = neighbours.length,
        result;

    for (; index < neighboursLength; index++) {
        sum = sum + neighbours[index];
    }

    if (currentValue === 0 && this.birth.indexOf(sum) > -1) {
        result = 1;
    } else if (currentValue === 1 && this.survival.indexOf(sum) > -1) {
        result = 1;
    } else {
        result = 0;
    }

    return result;
};

function generateFunction (ruleDescription) {
    // we could be able to get the number of neighbours and unroll the loop (as in the commented code below)
    // but it would add a dep to this module and the proper way to go would be to refactor the CA runners
    // this would make this function ~36% faster than the current one (for a moore neighbourhood of range 1)
    // without it however it is only ~16% faster, too little gain to warrant such complexity

    var str = [
        'var index = 0;',
        'var sum = 0;',
        'var neighboursLength = neighbours.length;',
        'var result;',

        'for (; index < neighboursLength; index++) {',
        '  sum = sum + neighbours[index];',
        '}'
        //'var sum = neighbours[0] + neighbours[1] + neighbours[2] + neighbours[3] + neighbours[4] + neighbours[5] + neighbours[6] + neighbours[7]'
    ];

    var birthConditions = null;
    var survivalConditions = null;
    var i;

    if (ruleDescription.survival.length > 0) {
        var survivalConditionsN = [];

        for (i = 0; i < ruleDescription.survival.length; i++) {
            survivalConditionsN.push('sum === ' + ruleDescription.survival[i]);
        }

        survivalConditions = 'currentValue === 1 && (' + survivalConditionsN.join(' || ') + ')'
    }


    if (ruleDescription.birth.length > 0) {
        var birthConditionsN = [];

        for (i = 0; i < ruleDescription.birth.length; i++) {
            birthConditionsN.push('sum === ' + ruleDescription.birth[i]);
        }

        birthConditions = 'currentValue === 0 && (' + birthConditionsN.join(' || ') + ')'
    }

    if (birthConditions) {
        str.push(
            'if (' + birthConditions + ') {',
            '  result = 1;'
        );
    }

    if (survivalConditions) {
        str.push(
            (birthConditions ? '} else ' : '') + 'if (' + survivalConditions + ') {',
            '  result = 1;'
        );
    }

    if (survivalConditions || birthConditions) {
        str.push(
            '} else {',
            '  result = 0;',
            '}'
        );
    } else {
        // should instead just replace the whole function with return 0;
        str.push('result = 0;');
    }

    str.push('return result;');


    return new Function('currentValue', 'neighbours', str.join('\n'));
}

var extendedLife = function (rule) {
    var ruleDescription = parseRuleString(rule);

    if (ruleDescription !== null) {
        //ruleDescription.process = extendedLifeFunction;
        ruleDescription.process = generateFunction(ruleDescription);
    }

    return ruleDescription;
};

module.exports = extendedLife;
