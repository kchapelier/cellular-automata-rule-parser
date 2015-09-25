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

module.exports = utils;
