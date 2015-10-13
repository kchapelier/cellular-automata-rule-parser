"use strict";

var utils = {};

utils.stripWhitespaces = function (string) {
    return string.replace(/\s/g, '');
};

utils.splitStringInNumberArray = function (string) {
    return string.split('').map(function (value) {
        return parseInt(value, 10);
    });
};

var regexRange = /([0-9]+)\.\.([0-9]+)/;

utils.splitCommaSeparatedNumbersWithRanges = function (string) {
    var splitString = string.split(','),
        result = [],
        expression,
        rangeMatch,
        i = 0;

    for (; i < splitString.length; i++) {
        expression = splitString[i];
        rangeMatch = regexRange.exec(expression);

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
    var tmp;

    if (min > max) {
        tmp = max;
        max = min;
        min = tmp;
    }

    for (; min <= max; min++) {
        array.push(min);
    }
};

module.exports = utils;
