var should = require('should'),
    textparse = require('../lib/text-parse');

// testing lib/text-parse
describe('lib/text-parse', function() {
  var parser;

  // text-parse.textToParagraphs
  describe('textToParagraphs', function() {
    beforeEach(function() {
      parser = textparse();

      parser.paragraphToSentences = function(paragraph) {
        return paragraph;
      };
    });

    it('should return an object with the right raw, type and children attributes', function() {
      var paragraphs = parser.textToParagraphs('This is. a sentence? This is. a second sentences. Sentence it is.');

      paragraphs.should.be.a('object');
      paragraphs.raw.should.eql('This is. a sentence? This is. a second sentences. Sentence it is.');
      paragraphs.type.should.eql('text');
      paragraphs.should.have.property('children');
    });

    it('should seperate any text into paragraphs divided by rn', function() {
      var paragraphs = parser.textToParagraphs('This is. a paragraph?\r\nThis is. a second. Paragraph.');

      paragraphs.children.should.eql([
        'This is. a paragraph?',
        'This is. a second. Paragraph.'
      ]);
    });

    it('should seperate any text into paragraphs divided by n', function() {
      var paragraphs = parser.textToParagraphs('This is. a paragraph?\nThis is. a second. Paragraph.');

      paragraphs.children.should.eql([
        'This is. a paragraph?',
        'This is. a second. Paragraph.'
      ]);
    });

    it('should seperate any text into paragraphs divided by r', function() {
      var paragraphs = parser.textToParagraphs('This is. a paragraph?\rThis is. a second. Paragraph.');

      paragraphs.children.should.eql([
        'This is. a paragraph?',
        'This is. a second. Paragraph.'
      ]);
    });
  });

  // text-parse.paragraphToSentences
  describe('paragraphToSentences', function() {
    beforeEach(function() {
      parser = textparse();

      parser.sentenceToWords = function(sentence) {
        return sentence;
      };
    });

    // checking that returns raw, type, and children attributes
    describe('checking that returned object has correct attributes', function() {
      it('should return an object with an attribute, raw, which is the paragraph', function() {
        var sentences = parser.paragraphToSentences('This is. a paragraph? With words and, punctuation.');

        sentences.raw.should.equal('This is. a paragraph? With words and, punctuation.');
      });

      it('should return an object with an attribute, type, which should be paragraph', function() {
        var sentences = parser.paragraphToSentences('This is. a paragraph? With words and, punctuation.');

        sentences.type.should.equal('paragraph');
      });

      it('should return an object with an attribute, children, which should be an array', function() {
        var sentences = parser.paragraphToSentences('This is. a paragraph? With words and, punctuation.');

        sentences.children.should.be.an.instanceOf(Array);
      });
    });

    // checking that it parses the paragraph correctly
    describe('checking that it parses correctly', function() {
      it('should split a paragraph into sentences', function() {
        var sentences = parser.paragraphToSentences('This is. a paragraph? With words and, punctuation.');

        sentences.children.should.eql([
          'This is. ',
          'a paragraph? ',
          'With words and, punctuation.'
        ]);
      });

      it('should split a paragraph into sentences when they end with double quotes', function() {
        var sentences = parser.paragraphToSentences('This is. a paragraph?" "With words and, punctuation."');

        sentences.children.should.eql([
          'This is. ',
          'a paragraph?" ',
          '"With words and, punctuation."'
        ]);
      });

      it('should split a paragraph and include the last sentence in the results even though there is no space after the punctuation', function() {
        var sentences = parser.paragraphToSentences('This is. a paragraph? With words and, punctuation.');

        sentences.children.should.include('With words and, punctuation.');
      });
    });
  });

  // text-parse.sentenceToWords
  describe('sentenceToWords', function() {
    beforeEach(function() {
      parser = textparse();
      parser.wordToChars = function(word) {
        return word;
      };
    });

    // checking that returns raw, type, and children attributes
    describe('checking that returned object has correct attributes', function() {
      it('should return an object with an attribute, raw, which is the sentence', function() {
        var words = parser.sentenceToWords('This is a paragraph?');

        words.raw.should.equal('This is a paragraph?');
      });

      it('should return an object with an attribute, type, which should be sentence', function() {
        var words = parser.sentenceToWords('This is a paragraph?');

        words.type.should.equal('sentence');
      });

      it('should return an object with an attribute, children, which should be an array', function() {
        var words = parser.sentenceToWords('This is a paragraph?');

        words.children.should.be.an.instanceOf(Array);
      });
    });

    // checking that it parses the sentence into words correctly
    describe('checking that it parses correctly', function() {
      it('should split the sentence at the spaces', function() {
        var words = parser.sentenceToWords('This is a paragraph?');

        words.children.should.eql([
          'This',
          'is',
          'a',
          'paragraph?'
        ]);
      });

      it('should split the sentence at the spaces even when there is more than one', function() {
        var words = parser.sentenceToWords('This is a    paragraph?');

        words.children.should.eql([
          'This',
          'is',
          'a',
          'paragraph?'
        ]);
      });
    });
  });

  // text-parse.wordToChars
  describe('wordToChars', function() {
    // checking that returns raw, noPunctuation, type, and children attributes
    describe('checking that returned object has correct attributes without POS', function() {
      beforeEach(function() {
        parser = textparse();
      });

      it('should have a raw attribute which has the word with the punctuation', function() {
        var words = parser.wordToChars('This?');

        words.raw.should.equal('This?');
      });

      it('should have a noPunctuation attribute which has the word without the punctuation', function() {
        var words = parser.wordToChars('This?');

        words.noPunctuation.should.equal('This');
      });

      it('should have a type attribute which should be the right type', function() {
        var words = parser.wordToChars('This?');

        words.type.should.equal('word');
      });

      it('should not have a partOfSpeech attribute when the pos option is not true', function() {
        var words = parser.wordToChars('This?');

        should.not.exist(words.partOfSpeech);
      });
    });

    // checking that it returns the part of speech when the option is enabled
    describe('checking that the returned object has the correct attributes when getting the part of speech', function() {
      beforeEach(function() {
        parser = textparse({pos: true});
      });

      it('should have a partOfSpeech attribute which should be a string representation of the part of speech', function() {
        var words = parser.wordToChars('John');

        words.partOfSpeech.should.equal('NNP');
      });
    });

    // checking that it parses each word correctly
    describe('checking that it parses correctly', function() {
      it('should label the characters correctly', function() {
        var words = parser.wordToChars('This?');

        words.should.have.property('children');

        words.children.should.eql([
          {raw: 'T', type: 'letter'},
          {raw: 'h', type: 'letter'},
          {raw: 'i', type: 'letter'},
          {raw: 's', type: 'letter'},
          {raw: '?', type: 'punctuation'}
        ]);
      });
    });
  });

  // wordPOS
  describe('wordPOS', function() {
    beforeEach(function() {
      parser = textparse({pos: true});
    });

    it('should return a part of speech for a word', function() {
      var partOfSpeech = parser.wordPOS('the');
      partOfSpeech.should.be.a('string');
    });
  });
});