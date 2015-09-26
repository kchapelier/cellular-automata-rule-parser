# cellular-automata-rule-parser

Parser for Life, Generations and Cyclic cellular automata rule formats.

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
- Parse the Cyclic CA rule format (R/T/C/N), with support for the Greenberg-Hastings model.

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

### Cyclic (R/T/C/N)

`R2/T5/C3/NN`

Whitespaces can be used freely.

`R2 / T5 / C3 / NN`

The Greenberg-Hastings model can be enabled with the GH modifier.

`R2 / T5 / C3 / NN / GH`

## Changelog

### 0.0.2 (2015.09.26) :

- Support the Greenberg-Hastings model in R/T/C/N rules.

### 0.0.1 (2015.09.25) :

- First implementation.
- Support for S/B, S/B/C and R/T/C/N rules.

## Roadmap

- Implement ```Vote for life``` rules.
- Write better doc.
- Implement ```NLUKY``` rules.
- Implement Wolfram's elementary cellular automaton.
- Implement a rule format for 3D/nD cellular automaton.

## License

MIT
