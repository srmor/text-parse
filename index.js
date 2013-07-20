module.exports = function(text) {
  // splits the text at \n
  var textToParagraphs = function(text) {
    var paragraphs = text.split( /[\r\n|\n|\r]+/g );
    return paragraphs.map(paragraphToSentences);
  };

  // splits the paragraph at end of sentence punctuation
  var paragraphToSentences = function(paragraph) {
    paragraph = paragraph.trim();
    var sentences = paragraph.match( /[^\.!\?]+[\.!\?(?="|')]+(\s|$)/g );
    return {
      raw: paragraph,
      type: 'paragraph',
      children: sentences.map(sentenceToWords)
    };
  };

  // splits the sentence at the spaces
  var sentenceToWords = function (sentence) {
    sentence = sentence.trim();
    var words = sentence.split(/\s+/);
    return {
      raw: sentence,
      type: 'sentence',
      children: words.map(wordToChars)
    };
  };

  // splits the word into characters and classifies each
  var wordToChars = function (word) {
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

    return {
      raw: word,
      noPunctuation: letters,
      type: 'word',
      children: chars
    };
  };

  return textToParagraphs(text);
};