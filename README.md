# cellular-automata-rule-parser

[![Build Status](https://travis-ci.org/kchapelier/cellular-automata-rule-parser.svg)](https://travis-ci.org/kchapelier/cellular-automata-rule-parser) [![NPM version](https://badge.fury.io/js/cellular-automata-rule-parser.svg)](http://badge.fury.io/js/cellular-automata-rule-parser)

Parser for Life, Generations, Vote for Life, Wolfram's Elementary CA, Cyclic CA, LUKY and NLUKY rule formats, as well as extended Life and Generations rule formats designed for 3D cellular automata.

## Installing and testing

With [npm](http://npmjs.org) do:

```
npm install cellular-automata-rule-parser
```

To run the test suite, clone this repository, install the dependencies and run the following command from the root directory:

```
npm test
```

## Features

- Parse the most common Life rule format (S/B) with an extension to define its neighbourhood type and range.
- Parse the Generations rule format (S/B/C) with an extension to define its neighbourhood type and range.
- Parse the Vote for Life rule format (xxx) with an extension to define its neighbourhood type and range.
- Parse the Cyclic CA rule format (R/T/C/N), with support for the Greenberg-Hastings model.
- Parse the Wolfram's Elementary CA rule format (Wxxx).
- Parse the LUKY and NLUKY rule format (LUKY xxxx and NLUKY xxxxx).
- Parse an extended comma-separated versions of the Life and Generations rule formats with support for ranges of values and unconventional neighbourhood types, specifically designed for 3D CA.
- Parse an extended comma-separated versions of the Life with stochastic properties (probability).

## Usage

```js
var parser = require('cellular-automata-rule-parser');

var rule = parser('S23/B3'); // classic conway's life rule

console.log(rule); // an object describing the rule

console.log(rule.process(0, [0,0,0,0,0,0,0,0])); // 0
console.log(rule.process(0, [1,1,1,0,0,0,0,0])); // 1
console.log(rule.process(1, [1,1,0,0,0,0,0,0])); // 1
console.log(rule.process(1, [1,1,1,1,0,0,0,0])); // 0

rule = parser('23/36'); // highlife
rule = parser('/2/3'); // brian's brain
rule = parser('W30'); // wolfram's rule 30
rule = parser('LUKY 3323'); // conway's life in luky format
```

The parser function accepts a rule string as argument and returns an object describing the rule with a process function.
The process function takes as argument the current value of a cell and a flat array containing all its neighbours.
It's the caller's responsibility to provide this array of neighbours.

## Supported rule formats

### Life (S/B)

`S23/B3`

The S and B are optional.

`23/3`

Whitespaces can be used freely.

`23 / 3`

The M and V extensions respectively sets the neighbourhood type to ```moore``` and ```von Neumann``` (the default is ```moore```).

`23 / 3 M` and `23 / 3 V`

The range of neighbourhood can be specified after the M/V extension.

`23 / 3 M 2`

### Extended Life (ES/B)

Extended life is a comma separated variant of the S/B format with additional support for ranges of values. The comma separated format allow to use number greater than 9 which is useful for 3D cellular automata.

`ES2,3/B3`

The S and B are optional, the E isn't.

`E2,3/3`

Whitespaces can be used freely.

`E 2,3 / 3`

The M and V extensions respectively sets the neighbourhood type to ```moore``` and ```von Neumann``` (the default is ```moore```).

`E 2,3 / 3 M` and `E 2,3 / 3 V`

The neighbourhood type can also be defined in full text with 'moore' and 'von-neumann'.

`E 2,3 / 3 moore` and `E 2,3 / 3 von-neumann`

More unconventional neighbourhood types are also accepted : ```axis```, ```corner```, ```edge``` and ```face```.

`E 2,3 / 3 axis` and `E 2,3 / 3 corner` for example

The range of neighbourhood can be specified after the neighbourhood type.

`E 2,3 / 3 M 2` or `E 2,3 / 3 moore 2`

Ranges of values can be specified with the X..X notation. The following rule matches all the values for 0 to 5 and 7 to 12 for survival.

`ES0..5,7..12/B`

### Extended Stochastic (ES:x/B:x)

The extended stochastic format is identical to the extended life with an added notation to add a probability per value or range of values.

The probability of survival or birth, a decimal number between 0 and 1 suffixed with a colon, can be added after the value or range of value.

`E 0..5:0.2 / 8:0.95`

### Generations (S/B/C)

`S6/B246/C3`

The S, B and C are optional.

`6/246/3`

Whitespaces can be used freely.

`6 / 246 / 3`

The M and V extensions respectively sets the neighbourhood type to ```moore``` and ```von Neumann``` (the default is ```moore```).

`6 / 246 / 3 M` and `6 / 246 / 3 V`

The range of neighbourhood can be specified after the M/V extension.

`6 / 246 / 3 M 2`

### Extended Generations (ES/B/C)

Extended life is a comma separated variant of the S/B format with additional support for ranges of values. The comma separated format allow to use number greater than 9 which is useful for 3D cellular automata.

`ES2,3/B3/C2`

The S, B and C are optional, the E isn't.

`E2,3/3/2`

Whitespaces can be used freely.

`E 2,3 / 3 / 2`

The M and V extensions respectively sets the neighbourhood type to ```moore``` and ```von Neumann``` (the default is ```moore```).

`E 2,3 / 3 / 2 M` and `E 2,3 / 3 / 2 V`

The neighbourhood type can also be defined in full text with 'moore' and 'von-neumann'.

`E 2,3 / 3 / 2 moore` and `E 2,3 / 3 / 2 von-neumann`

More unconventional neighbourhood types are also accepted : ```axis```, ```corner```, ```edge``` and ```face```.

`E 2,3 / 3 / 2 axis` and `E 2,3 / 3 / 2 corner` for example

The range of neighbourhood can be specified after the neighbourhood type.

`E 2,3 / 3 / 2 M 2` or `E 2,3 / 3 / 2 moore 2`

Ranges of values can be specified with the X..X notation. The following rule matches all the values for 0 to 5 and 7 to 12 for survival.

`ES0..5,7..12/B/C2`

### Vote for Life

`13579`

Whitespaces can be used freely.

`1 3 5 7 9`

The M and V extensions respectively sets the neighbourhood type to ```moore``` and ```von Neumann``` (the default is ```moore```).

`13579 M` and `13579 V`

The range of neighbourhood can be specified after the M/V extension.

`13579 M 2`

### Cyclic CA (R/T/C/N)

`R2/T5/C3/NN`

Whitespaces can be used freely.

`R2 / T5 / C3 / NN`

The Greenberg-Hastings model can be enabled with the GH modifier.

`R2 / T5 / C3 / NN / GH`

### Wolfram's Elementary CA

`W30` or `Rule30`

Whitespaces can be used freely.

`W 30` or `Rule 30`

### LUKY

`LUKY3323`

Whitespaces can be used freely.

`LUKY 3 3 2 3`

### NLUKY

`NLUKY03323`

Whitespaces can be used freely.

`NLUKY 0 3 3 2 3`

## Changelog

### 3.0.1 (2019.09.28)

- Update dev dependencies.

### 3.0.0 (2019.04.19)

- Minor refactoring.
- Reduce npm package size.
- Update (and greatly reduce the number of) dev dependencies.
- Remove linting and code style checking.
- Change node versions tested with travis.
- Less direct support for older browser (now use `const` and `let` variable declarations).

### 2.1.1 (2016.12.14) :

- Fix an issue with "extended stochastic" format returning NaN values in the rule description (not affecting the actual process function).

### 2.1.0 (2016.03.22) :

- Support for "extended stochastic" format.

### 2.0.0 (2016.01.24) :

- Support for "extended" comma separated S/B/C variant (extended-generations).
- Rename "extended" to "extended-life".
- Fix incorrect generations implementation.
- Allow 9 as a valid value for LUKY and NLUKY rules.

### 1.1.0 (2015.11.02) :

- Make the extended S/B format recognize 'moore', 'von-neumann', 'axis', 'corner', 'edge' and 'face' as valid neighbourhood types.

### 1.0.0 (2015.10.17) :

- Remove the test folder from the NPM package.
- Add linting and code style checking.
- Add travis support (mocha tests only).

### 0.0.6 (2015.10.13) :

- Rename "experimental" S/B variant to "extended" S/B format.
- Support ranges (X..X) for extended S/B format.
- Document extended S/B format.

### 0.0.5 (2015.10.04) :

- Performance optimization

### 0.0.4 (2015.10.02) :

- Support for LUKY and NLUKY rules.
- Support for "experimental" comma separated S/B variant (undocumented).

### 0.0.3 (2015.09.30) :

- Accept 9 as a valid value for S and B in S/B and S/B/C rules.
- Support for "Vote for life" rules.
- Support for "Wolfram" (elementary cellular automation) rules.

### 0.0.2 (2015.09.26) :

- Support the Greenberg-Hastings model in R/T/C/N rules.

### 0.0.1 (2015.09.25) :

- First implementation.
- Support for S/B, S/B/C and R/T/C/N rules.

## Roadmap

- Write better doc.

## License

MIT
