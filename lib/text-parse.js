var pos = require('pos');

module.exports = function (options) {
  var self = {};

  self.Pos = pos;

  var options = options || {};

  // splits the text at \n
  self.textToParagraphs = function (text) {
    var paragraphs = text.split( /[\r\n|\n|\r]+/g );
    return {
      raw: text,
      type: 'text',
      children: paragraphs.map(self.paragraphToSentences)
    };
  };

  // splits the paragraph at end of sentence punctuation
  self.paragraphToSentences = function (paragraph) {
    paragraph = paragraph.trim();
    var sentences = paragraph.match( /[^\.!\?]+[\.!\?(?="|')]+(\s|$)/g );
    return {
      raw: paragraph,
      type: 'paragraph',
      children: sentences.map(self.sentenceToWords)
    };
  };

  // splits the sentence at the spaces
  self.sentenceToWords = function (sentence) {
    sentence = sentence.trim();
    var words = sentence.split(/\s+/);
    return {
      raw: sentence,
      type: 'sentence',
      children: words.map(self.wordToChars)
    };
  };

  // splits the word into characters and classifies each
  self.wordToChars = function (word) {
    var chars = [];
    var letters = '';
    var punctuation = [];

    for (var i = 0; i < word.length; i++) {
      var curChar = word[i];

      // if it's not a letter then it's punctuation
      if (/\W/.test(curChar)) {
        chars.push({raw: curChar, type: 'punctuation'});
        punctuation.push(curChar);
      }
      // if it's a letter than append to noPunctuation
      else {
        chars.push({raw: curChar, type: 'letter'});
        letters += curChar;
      }
    }

    var newWord = {
      raw: word,
      noPunctuation: letters,
      type: 'word',
      children: chars
    };

    if (options.pos) {
      newWord.partOfSpeech = self.wordPOS(word);
    }

    return newWord;
  };

  self.wordPOS = function (word) {
    var posTags = new pos.Tagger().tag([word]);
    var partOfSpeech = posTags[0][1];

    return partOfSpeech;
  };

  return self;
};