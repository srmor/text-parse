var should = require('should'),
    Main = require('../index');

describe('main', function() {
  var parser;
  describe('parse', function() {
    beforeEach(function() {
      parser = new Main();
    });

    describe('should parse the text', function() {
      it('should pass the correct options to textparse', function() {
        var curText = 'this is some text';

        var curOptions = {
          pos: true
        };

        parser.textparse = function(options) {
          options.should.eql(curOptions);
          return {
            textToParagraphs: function() {}
          };
        };

        parser.parse(curText, curOptions);
      });

      it('should pass the correct text to textparse', function() {
        var curText = 'this is some text';

        parser.textparse = function() {
          return {
            textToParagraphs: function(text) {
              text.should.equal(curText);
            }
          };
        };

        parser.parse(curText);
      });
    });
  });
});