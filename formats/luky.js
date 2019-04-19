"use strict";

const utils = require('../utils/utils');
const ruleRegexp = /^LUKY([0-9])([0-9])([0-9])([0-9])$/i;

function lukyFunction (currentValue, neighbours) {
  let sum = 0;
  let result = 0;

  for (let index = 0; index < neighbours.length; index++) {
    sum = sum + (neighbours[index] === 1 ? 1 : 0);
  }

  if (currentValue === 0 && sum >= this.lowBirth && sum <= this.highBirth) {
    result = 1;
  } else if (currentValue === 1 && sum >= this.lowSurvival && sum <= this.highSurvival) {
    result = 1;
  }

  return result;
}

module.exports = function parseRuleString (ruleString) {
  const extractedRule = ruleRegexp.exec(utils.stripWhitespaces(ruleString));

  return extractedRule ? {
    process: lukyFunction,
    ruleFormat: 'luky',
    ruleString: ruleString,
    lowBirth: parseInt(extractedRule[1], 10),
    highBirth: parseInt(extractedRule[2], 10),
    lowSurvival: parseInt(extractedRule[3], 10),
    highSurvival: parseInt(extractedRule[4], 10),
    neighbourhoodType: 'moore',
    neighbourhoodRange: 1
  } : null;
};