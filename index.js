"use strict";

var formats = {
    life: require('./formats/life'),
    experimental: require('./formats/experimental'),
    generations: require('./formats/generations'),
    cyclic: require('./formats/cyclic'),
    vote: require('./formats/vote'),
    wolfram: require('./formats/wolfram'),
    luky: require('./formats/luky'),
    nluky: require('./formats/nluky')
};

var parser = function (rule, format) {
    var result = null;

    if (typeof rule === 'string') {
        if (!!format) {
            result = !!formats[format] ? formats[format](rule) : null;
        } else {
            for (format in formats) {
                result = formats[format](rule);

                if (result !== null) {
                    break;
                }
            }
        }
    }

    return result;
};

module.exports = parser;
