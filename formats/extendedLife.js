"use strict";

const utils = require('../utils/utils');
const ruleRegexp = /^ES?([0-9,.]*)\/B?([0-9,.]*)(M|V|von-neumann|moore|axis|corner|edge|face|)([0-9]*)$/i;

function getNeighbourMethod (methodId) {
  methodId = methodId.toLowerCase();

  if (methodId === 'v') {
    return 'von-neumann';
  } else if (methodId === 'm' || methodId === ''){
    return 'moore';
  } else {
    return methodId;
  }
}

function extendedLifeFunction (currentValue, neighbours) {
  let sum = 0;
  let result = 0;

  for (let index = 0; index < neighbours.length; index++) {
    sum = sum + neighbours[index];
  }

  if (currentValue === 0 && this.birth.indexOf(sum) > -1) {
    result = 1;
  } else if (currentValue === 1 && this.survival.indexOf(sum) > -1) {
    result = 1;
  }

  return result;
}

module.exports = function parseRuleString (ruleString) {
  const extractedRule = ruleRegexp.exec(utils.stripWhitespaces(ruleString));

  return extractedRule ? {
    process: extendedLifeFunction,
    ruleFormat: 'extended-life',
    ruleString: ruleString,
    survival: utils.splitCommaSeparatedNumbersWithRanges(extractedRule[1]),
    birth: utils.splitCommaSeparatedNumbersWithRanges(extractedRule[2]),
    neighbourhoodType: getNeighbourMethod(extractedRule[3]),
    neighbourhoodRange: parseInt(extractedRule[4], 10) || 1
  } : null;
};