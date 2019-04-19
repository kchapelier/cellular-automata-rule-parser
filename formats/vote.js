"use strict";

const utils = require('../utils/utils');
const ruleRegexp = /^([0-9]+)([MV]?)([0-9]*)$/i;

function getNeighbourMethod (methodId) {
  if (methodId === 'V' || methodId === 'v' || methodId === 'von-neumann') {
    return 'von-neumann';
  } else {
    return 'moore';
  }
}

function voteFunction (currentValue, neighbours) {
  let sum = currentValue;

  for (let index = 0; index < neighbours.length; index++) {
    sum = sum + neighbours[index];
  }

  return this.vote.indexOf(sum) > -1 ? 1 : 0;
}

module.exports = function parseRuleString (ruleString) {
  const extractedRule = ruleRegexp.exec(utils.stripWhitespaces(ruleString));

  return extractedRule ? {
    process: voteFunction,
    ruleFormat: 'vote',
    ruleString: ruleString,
    vote: utils.splitStringInNumberArray(extractedRule[1]),
    neighbourhoodType: getNeighbourMethod(extractedRule[2]),
    neighbourhoodRange: parseInt(extractedRule[3], 10) || 1
  } : null;
};