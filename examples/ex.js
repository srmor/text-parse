var textParse = require('..'),
    fs = require('fs'),
    read = fs.readFileSync
    text = read('ex.txt', 'utf8'),
    util = require('util');

var parser = textParse();

var parsedText = parser.parse(text);
console.log(util.inspect(parsedText, {showHidden: true, depth: null, colors: true}));