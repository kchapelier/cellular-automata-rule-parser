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

utils.splitCommaSeparatedNumbers = function (string) {
    return string.split(',').map(function (value) {
        return parseInt(value, 10);
    }).filter(function (v) {
        return !isNaN(v);
    });
};

console.log(utils.splitCommaSeparatedNumbers('12,23,5,'));

module.exports = utils;
