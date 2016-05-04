'use strict';

var parser = require('./parser');
var interpreter = require('./interpreter');
var expr = process.argv.slice(2).join(' ');

console.log(interpreter.eval(parser.parse(expr)));
