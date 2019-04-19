"use strict";

const utils = require('../utils/utils');
const ruleRegexp = /^R([1-9][0-9]*)\/T([0-9]+)\/C([1-9][0-9]*)\/(NM|NN)(\/GH|)$/i;

//actually not the same as in life and generations
function getNeighbourMethod (methodId) {
  if (methodId === 'NN' || methodId === 'nn' || methodId === 'von-neumann') {
    return 'von-neumann';
  } else {
    return 'moore';
  }
}

function cyclicFunction (currentValue, neighbours) {
  const nextValue = (currentValue + 1) % this.stateCount;
  let sum = 0;
  let result = 0;

  for (let index = 0; index < neighbours.length; index++) {
    sum = sum + (neighbours[index] === nextValue ? 1 : 0);
  }

  if (sum >= this.threshold || (this.greenbergHastingsModel && currentValue !== 0)) {
    result = nextValue;
  } else {
    result = currentValue;
  }

  return result;
}

module.exports = function parseRuleString (ruleString) {
  const extractedRule = ruleRegexp.exec(utils.stripWhitespaces(ruleString));

  return extractedRule ? {
    process: cyclicFunction,
    ruleFormat: 'cyclic',
    ruleString: ruleString,
    threshold: parseInt(extractedRule[2], 10),
    stateCount: parseInt(extractedRule[3], 10),
    greenbergHastingsModel: (!!extractedRule[5]),
    neighbourhoodType: getNeighbourMethod(extractedRule[4]),
    neighbourhoodRange: parseInt(extractedRule[1], 10) || 1
  } : null;
};