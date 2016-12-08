"use strict";

var formats = {
    life: require('./formats/life'),
    extendedLife: require('./formats/extendedLife'),
    extendedStochastic: require('./formats/extendedStochastic'),
    generations: require('./formats/generations'),
    extendedGenerations: require('./formats/extendedGenerations'),
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

var time = Date.now();

var rule = parser('E 3,2 / 3');
var c = 0;
var neighbours = [1,1,0,0,0,0,0,0];

for (var i = 0; i < 30000000; i++) {
    c+= rule.process(Math.random() * 2 | 0, neighbours)
}
console.log(c);
console.log((Date.now() - time) + ' ms');

module.exports = parser;
