var textparse = require('./lib/text-parse');

module.exports = function(text) {
  var parser = textparse();
  return parser.textToParagraphs(text);
};