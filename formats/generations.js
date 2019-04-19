"use strict";

const utils = require('../utils/utils');
const ruleRegexp = /^S?([0-9]*)\/B?([0-9]*)\/C?([1-9][0-9]*)([MV]?)([0-9]*)$/i;

function getNeighbourMethod (methodId) {
  if (methodId === 'V' || methodId === 'v' || methodId === 'von-neumann') {
    return 'von-neumann';
  } else {
    return 'moore';
  }
}

function generationsFunction (currentValue, neighbours) {
  let sum = 0;
  let result = 0;

  for (let index = 0; index < neighbours.length; index++) {
    sum = sum + (neighbours[index] === 1 ? 1 : 0);
  }

  if (currentValue === 0 && this.birth.indexOf(sum) > -1) {
    result = 1;
  } else if (currentValue === 1 && this.survival.indexOf(sum) > -1) {
    result = 1;
  } else if (currentValue > 0) {
    result = (currentValue + 1) % this.stateCount;
  }

  return result;
}

module.exports = function parseRuleString (ruleString) {
  const extractedRule = ruleRegexp.exec(utils.stripWhitespaces(ruleString));

  return extractedRule ? {
    process: generationsFunction,
    ruleFormat: 'generations',
    ruleString: ruleString,
    survival: utils.splitStringInNumberArray(extractedRule[1]),
    birth: utils.splitStringInNumberArray(extractedRule[2]),
    stateCount: parseInt(extractedRule[3], 10) || 1,
    neighbourhoodType: getNeighbourMethod(extractedRule[4]),
    neighbourhoodRange: parseInt(extractedRule[5], 10) || 1
  } : null;
};