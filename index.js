var textparse = require('./lib/text-parse');

module.exports = function(text, options) {
  var options = options || {};

  var parser = textparse(options);
  return parser.textToParagraphs(text);
};