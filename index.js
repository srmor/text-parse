var textparse = require('./lib/text-parse');

module.exports = function() {
  var self = {};

  self.textparse = textparse;

  self.parse = function(text, options) {
    var options = options || {};

    var parser = self.textparse(options);
    return parser.textToParagraphs(text);
  };

  return self;
};