"use strict";

const utils = require('../utils/utils');
const ruleRegexp = /^(W|Rule)([0-9]{1,3})$/i;

function wolframFunction (currentValue, neighbours) {
  const binaryState = (neighbours[0] ? 4 : 0) + (currentValue ? 2 : 0) + (neighbours[1] ? 1 : 0);

  return (this.ruleNumber & Math.pow(2, binaryState) ? 1 : 0);
}

module.exports = function parseRuleString (ruleString) {
  const extractedRule = ruleRegexp.exec(utils.stripWhitespaces(ruleString));
  const ruleNumber = extractedRule ? parseInt(extractedRule[2], 10) : null;

  return ruleNumber !== null && ruleNumber >= 0 && ruleNumber <= 255 ? {
    process: wolframFunction,
    ruleFormat: 'wolfram',
    ruleString: ruleString,
    ruleNumber: ruleNumber,
    neighbourhoodType: 'von-neumann',
    neighbourhoodRange: 1
  } : null;
};