"use strict";

var formats = {
    life: require('./formats/life'),
    generations: require('./formats/generations'),
    cyclic: require('./formats/cyclic')
};

var parser = function (rule, format) {
    var result = null;

    if (!!format) {
        result = formats[format](rule);
    } else {
        for (format in formats) {
            result = formats[format](rule);

            if (result !== null) {
                break;
            }
        }
    }

    return result;
};

console.log(parser('R7/T34/C13/NM'));

module.exports = parser;
