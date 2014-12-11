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

    // checking that it returns an object with raw, type, length and children attributes
    describe('checking that the returned object has the correct attributes', function() {
      it('should return an object with the right raw, type and children attributes', function() {
        var text = parser.textToParagraphs('This is. a sentence? This is. a second sentences. Sentence it is.');

        text.should.be.a.type('object');
        text.raw.should.eql('This is. a sentence? This is. a second sentences. Sentence it is.');
        text.type.should.eql('text');
        text.should.have.property('children');
      });

      it('should give the right length for the number of paragraphs', function() {
        var text = parser.textToParagraphs('This is. a paragraph?\r\nThis is. a second. Paragraph.\r\nAnd here. Is a. Paragraph the third!!');

        text.length.should.eql(3);
      });
    });

    // checking that it parses paragraphs at \r\n, \n, and \r
    describe('checking that it parses paragraphs correctly', function() {
      it('should seperate any text into paragraphs divided by rn', function() {
        var text = parser.textToParagraphs('This is. a paragraph?\r\nThis is. a second. Paragraph.');

        text.children.should.eql([
          'This is. a paragraph?',
          'This is. a second. Paragraph.'
        ]);
      });

      it('should seperate any text into paragraphs divided by n', function() {
        var text = parser.textToParagraphs('This is. a paragraph?\nThis is. a second. Paragraph.');

        text.children.should.eql([
          'This is. a paragraph?',
          'This is. a second. Paragraph.'
        ]);
      });

      it('should seperate any text into paragraphs divided by r', function() {
        var text = parser.textToParagraphs('This is. a paragraph?\rThis is. a second. Paragraph.');

        text.children.should.eql([
          'This is. a paragraph?',
          'This is. a second. Paragraph.'
        ]);
      });
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

    // checking that returns raw, type, length, and children attributes
    describe('checking that returned object has correct attributes', function() {
      it('should return an object with an attribute, raw, which is the paragraph', function() {
        var paragraph = parser.paragraphToSentences('This is. a paragraph? With words and, punctuation.');

        paragraph.raw.should.equal('This is. a paragraph? With words and, punctuation.');
      });

      it('should return an object with an attribute, type, which should be paragraph', function() {
        var paragraph = parser.paragraphToSentences('This is. a paragraph? With words and, punctuation.');

        paragraph.type.should.equal('paragraph');
      });

      it('should return an object with an attribute, children, which should be an array', function() {
        var paragraph = parser.paragraphToSentences('This is. a paragraph? With words and, punctuation.');

        paragraph.children.should.be.an.instanceOf(Array);
      });

      it('should determine the correct number of sentences in the paragraph and put it as the length', function() {
        var paragraph = parser.paragraphToSentences('This is. a paragraph? With words and, punctuation.');

        paragraph.length.should.eql(3);
      });
    });

    // checking that it parses the paragraph correctly
    describe('checking that it parses correctly', function() {
      it('should split a paragraph into sentences', function() {
        var paragraph = parser.paragraphToSentences('This is. a paragraph? With words and, punctuation.');

        paragraph.children.should.eql([
          'This is. ',
          'a paragraph? ',
          'With words and, punctuation.'
        ]);
      });

      it('should split a paragraph into sentences when they end with double quotes', function() {
        var paragraph = parser.paragraphToSentences('This is. a paragraph?" "With words and, punctuation."');

        paragraph.children.should.eql([
          'This is. ',
          'a paragraph?" ',
          '"With words and, punctuation."'
        ]);
      });

      it('should split a paragraph and include the last sentence in the results even though there is no space after the punctuation', function() {
        var paragraph = parser.paragraphToSentences('This is. a paragraph? With words and, punctuation.');

        (paragraph.children).should.endWith('With words and, punctuation.');
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

    // checking that returns raw, type, length and children attributes
    describe('checking that returned object has correct attributes', function() {
      it('should return an object with an attribute, raw, which is the sentence', function() {
        var sentence = parser.sentenceToWords('This is a paragraph?');

        sentence.raw.should.equal('This is a paragraph?');
      });

      it('should return an object with an attribute, type, which should be sentence', function() {
        var sentence = parser.sentenceToWords('This is a paragraph?');

        sentence.type.should.equal('sentence');
      });

      it('should return an object with an attribute, children, which should be an array', function() {
        var sentence = parser.sentenceToWords('This is a paragraph?');

        sentence.children.should.be.an.instanceOf(Array);
      });

      it('should determine the correct number of words in the sentence and put it as the length', function() {
        var sentence = parser.sentenceToWords('This is a sentence with, a lot of words that go on for a while.');

        sentence.length.should.eql(15);
      });
    });

    // checking that it parses the sentence into words correctly
    describe('checking that it parses correctly', function() {
      it('should split the sentence at the spaces', function() {
        var sentence = parser.sentenceToWords('This is a paragraph?');

        sentence.children.should.eql([
          'This',
          'is',
          'a',
          'paragraph?'
        ]);
      });

      it('should split the sentence at the spaces even when there is more than one', function() {
        var sentence = parser.sentenceToWords('This is a    paragraph?');

        sentence.children.should.eql([
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
    // checking that returns raw, noPunctuation, type, length, and children attributes
    describe('checking that returned object has correct attributes without POS', function() {
      beforeEach(function() {
        parser = textparse();
      });

      it('should have a raw attribute which has the word with the punctuation', function() {
        var word = parser.wordToChars('This?');

        word.raw.should.equal('This?');
      });

      it('should have a noPunctuation attribute which has the word without the punctuation', function() {
        var word = parser.wordToChars('This?');

        word.noPunctuation.should.equal('This');
      });

      it('should have a type attribute which should be the right type', function() {
        var word = parser.wordToChars('This?');

        word.type.should.equal('word');
      });

      it('should not have a partOfSpeech attribute when the pos option is not true', function() {
        var word = parser.wordToChars('This?');

        should.not.exist(word.partOfSpeech);
      });

      it('should determine the correct number of characters in the word and put it as the length', function() {
        var word = parser.wordToChars('Hello?');

        word.length.should.eql(6);
      });
    });

    // checking that it returns the part of speech when the option is enabled
    describe('checking that the returned object has the correct attributes when getting the part of speech', function() {
      beforeEach(function() {
        parser = textparse({pos: true});
      });

      it('should have a partOfSpeech attribute which should be a string representation of the part of speech', function() {
        var word = parser.wordToChars('John');

        word.partOfSpeech.should.equal('NNP');
      });
    });

    // checking that it parses each word correctly
    describe('checking that it parses correctly', function() {
      it('should label the characters correctly', function() {
        var word = parser.wordToChars('This?');

        word.should.have.property('children');

        word.children.should.eql([
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