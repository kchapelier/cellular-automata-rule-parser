"use strict";

const regexRange = /([0-9]+)\.\.([0-9]+)/;
const regexProbability = /([0-9.]+):([0-9.]+)/;

const utils = {};

utils.stripWhitespaces = function (string) {
  return string.replace(/\s/g, '');
};

utils.splitStringInNumberArray = function (string) {
  return string.split('').map(function (value) {
    return parseInt(value, 10);
  });
};

utils.splitCommaSeparatedNumbersWithRanges = function (string) {
  const splitString = string.split(',');
  const result = [];

  for (let i = 0; i < splitString.length; i++) {
    const expression = splitString[i];
    const rangeMatch = regexRange.exec(expression);

    if (rangeMatch) {
      utils.appendRangeToArray(parseInt(rangeMatch[1], 10), parseInt(rangeMatch[2], 10), result);
    } else {
      result.push(parseInt(expression, 10));
    }
  }

  return result.filter(function (v) {
    return !isNaN(v);
  });
};

utils.appendRangeToArray = function (min, max, array) {
  if (min > max) {
    const tmp = max;
    max = min;
    min = tmp;
  }

  for (; min <= max; min++) {
    array.push(min);
  }
};

utils.splitCommaSeparatedNumbersWithRangesAndProbability = function (string) {
  const splitString = string.split(',');
  const result = {};

  for (let i = 0; i < splitString.length; i++) {
    const expression = splitString[i];
    const rangeMatch = regexRange.exec(expression);
    const probabilityMatch = regexProbability.exec(expression);
    const probability = Math.max(0, Math.min(1, probabilityMatch ? parseFloat(probabilityMatch[2]) : 1));

    if (probability > 0 || isNaN(probability)) {
      if (rangeMatch) {
        utils.appendRangeToObjectWithProbability(parseInt(rangeMatch[1], 10), parseInt(rangeMatch[2], 10), probability, result);
      } else {
        const parsedValue = parseInt(expression, 10);
        if (!isNaN(parsedValue)) {
          result[parsedValue] = probability;
        }
      }
    }
  }

  return result;
};

utils.appendRangeToObjectWithProbability = function (min, max, probability, object) {
  if (min > max) {
    const tmp = max;
    max = min;
    min = tmp;
  }

  for (; min <= max; min++) {
    object[min] = probability;
  }
};

module.exports = utils;