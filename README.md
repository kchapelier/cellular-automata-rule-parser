# cellular-automata-rule-parser

Parser for Life, Generations, Vote for Life, Wolfram's Elementary CA, Cyclic CA, LUKY and NLUKY rule formats.

## Installing and testing

With [npm](http://npmjs.org) do:

```
npm install cellular-automata-rule-parser
```

To run the test suite, run the following command from the ```cellular-automata-rule-parser``` directory:

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
- Work on perfs.

## License

MIT
