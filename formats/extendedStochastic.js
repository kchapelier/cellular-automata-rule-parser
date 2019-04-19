"use strict";

const utils = require('../utils/utils');
const ruleRegexp = /^ES?([0-9,.:]*)\/B?([0-9,.:]*)(M|V|von-neumann|moore|axis|corner|edge|face|)([0-9]*)$/i;

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

function extendedStochasticFunction (currentValue, neighbours, rng) {
  let sum = 0;
  let result = 0;

  rng = rng || Math.random;

  for (let index = 0; index < neighbours.length; index++) {
    sum = sum + neighbours[index];
  }

  if (currentValue === 0 && !!this.birth[sum]) {
    result = (this.birth[sum] === 1 || this.birth[sum] > rng()) ? 1 : 0;
  } else if (currentValue === 1 && !!this.survival[sum]) {
    result = (this.survival[sum] === 1 || this.survival[sum] > rng()) ? 1 : 0;
  }

  return result;
}

module.exports = function parseRuleString (ruleString) {
  const extractedRule = ruleRegexp.exec(utils.stripWhitespaces(ruleString));

  return extractedRule ? {
    process: extendedStochasticFunction,
    ruleFormat: 'extended-stochastic',
    ruleString: ruleString,
    survival: utils.splitCommaSeparatedNumbersWithRangesAndProbability(extractedRule[1]),
    birth: utils.splitCommaSeparatedNumbersWithRangesAndProbability(extractedRule[2]),
    neighbourhoodType: getNeighbourMethod(extractedRule[3]),
    neighbourhoodRange: parseInt(extractedRule[4], 10) || 1
  } : null;
};