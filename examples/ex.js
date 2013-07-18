var parse = require('..'),
    fs = require('fs'),
    read = fs.readFileSync
    text = read('ex.txt', 'utf8'),
    util = require('util');

var parsedText = parse(text);
console.log(util.inspect(parsedText, {showHidden: true, depth: null, colors: true}));