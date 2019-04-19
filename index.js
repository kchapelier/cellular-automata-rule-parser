"use strict";

const formats = {
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

module.exports = function parser (ruleString, format) {
  let result = null;

  if (typeof ruleString === 'string') {
    if (format) {
      result = formats.hasOwnProperty(format) ? formats[format](ruleString) : null;
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