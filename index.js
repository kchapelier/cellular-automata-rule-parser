"use strict";

var formats = {
    life: require('./formats/life'),
    extendedLife: require('./formats/extendedLife'),
    generations: require('./formats/generations'),
    cyclic: require('./formats/cyclic'),
    vote: require('./formats/vote'),
    wolfram: require('./formats/wolfram'),
    luky: require('./formats/luky'),
    nluky: require('./formats/nluky')
};

var parser = function parser (ruleString, format) {
    var result = null;

    if (typeof ruleString === 'string') {
        if (!!format) {
            result = !!formats[format] ? formats[format](ruleString) : null;
        } else {
            for (format in formats) {
                if (formats.hasOwnProperty(format)) {
                    result = formats[format](ruleString);

                    if (result !== null) {
                        break;
                    }
                }
            }
        }
    }

    return result;
};

module.exports = parser;
