# Text Parse

A plaintext parser written in JS for [node](http://nodejs.org/). It parses any piece of text into paragraphs, sentences, words, letters and punctuation.

## Installing

```
npm install text-parse
```

## Running Tests

[![Build Status](https://travis-ci.org/srmor/text-parse.png?branch=master)](https://travis-ci.org/srmor/text-parse)

```
make test
```

## Usage

```
var parse = require('text-parse');
console.log(parse(text));
```

## Part of Speech Option

Optionally text-parse can return the part of speech of each word (powered by [pos](https://github.com/fortnightlabs/pos-js)). To enable this option just include it in the option object parameter of the parser. So instead of using `var parseTree = parse(text)` you can do `var parseTree = parse(text, {pos: true})` and it will return a `partOfSpeech` attribute on all the word objects. The part of speech tags are the same tags that [pos](https://github.com/fortnightlabs/pos-js) returns.

## Example

### Input

text:
```
Sed ut unde, omnis error sit voluptatem; accusantium's.
```

### Output

```
{
  raw: 'Sed ut unde, omnis error sit voluptatem; accusantium's.',
  type: 'text',
  length: 1,
  children:
  [{ raw: 'Sed ut unde, omnis error sit voluptatem; accusantium\'s.',
      type: 'paragraph',
      length: 1,
      children:
       [ { raw: 'Sed ut unde, omnis error sit voluptatem; accusantium\'s.',
           type: 'sentence',
           length: 8,
           children:
            [ { raw: 'Sed',
                type: 'word',
                length: 3,
                noPunctuation: 'Sed',
                possessive: false,
                children:
                 [ { raw: 'S', type: 'letter' },
                   { raw: 'e', type: 'letter' },
                   { raw: 'd', type: 'letter' },
                  ] },
              { raw: 'ut',
                type: 'word',
                length: 2,
                noPunctuation: 'ut',
                possessive: false,
                children:
                 [ { raw: 'u', type: 'letter' },
                   { raw: 't', type: 'letter' },
                  ] },
              { raw: 'unde,',
                type: 'word',
                length: 5,
                noPunctuation: 'unde',
                possessive: false,
                children:
                 [ { raw: 'u', type: 'letter' },
                   { raw: 'n', type: 'letter' },
                   { raw: 'd', type: 'letter' },
                   { raw: 'e', type: 'letter' },
                   { raw: ',', type: 'punctuation' },
                  ] },
              { raw: 'omnis',
                type: 'word',
                length: 5,
                noPunctuation: 'omnis',
                possessive: false,
                children:
                 [ { raw: 'o', type: 'letter' },
                   { raw: 'm', type: 'letter' },
                   { raw: 'n', type: 'letter' },
                   { raw: 'i', type: 'letter' },
                   { raw: 's', type: 'letter' },
                  ] },
              { raw: 'error',
                type: 'word',
                length: 5,
                noPunctuation: 'error',
                possessive: false,
                children:
                 [ { raw: 'e', type: 'letter' },
                   { raw: 'r', type: 'letter' },
                   { raw: 'r', type: 'letter' },
                   { raw: 'o', type: 'letter' },
                   { raw: 'r', type: 'letter' },
                  ] },
              { raw: 'sit',
                type: 'word',
                length: 3,
                noPunctuation: 'sit',
                possessive: false,
                children:
                 [ { raw: 's', type: 'letter' },
                   { raw: 'i', type: 'letter' },
                   { raw: 't', type: 'letter' },
                  ] },
              { raw: 'voluptatem;',
                type: 'word',
                length: 11,
                noPunctuation: 'voluptatem',
                possessive: false,
                children:
                 [ { raw: 'v', type: 'letter' },
                   { raw: 'o', type: 'letter' },
                   { raw: 'l', type: 'letter' },
                   { raw: 'u', type: 'letter' },
                   { raw: 'p', type: 'letter' },
                   { raw: 't', type: 'letter' },
                   { raw: 'a', type: 'letter' },
                   { raw: 't', type: 'letter' },
                   { raw: 'e', type: 'letter' },
                   { raw: 'm', type: 'letter' },
                   { raw: ';', type: 'punctuation' },
                  ] },
              { raw: 'accusantium\'s.',
                type: 'word',
                length: 14,
                noPunctuation: 'accusantiums',
                possessive: true,
                withoutPossessive: 'accusantium',
                children:
                 [ { raw: 'a', type: 'letter' },
                   { raw: 'c', type: 'letter' },
                   { raw: 'c', type: 'letter' },
                   { raw: 'u', type: 'letter' },
                   { raw: 's', type: 'letter' },
                   { raw: 'a', type: 'letter' },
                   { raw: 'n', type: 'letter' },
                   { raw: 't', type: 'letter' },
                   { raw: 'i', type: 'letter' },
                   { raw: 'u', type: 'letter' },
                   { raw: 'm', type: 'letter' },
                   { raw: '\'', type: 'punctuation' },
                   { raw: 's', type: 'letter' },
                   { raw: '.', type: 'punctuation' },
                  ] },
              ] },
        ] },
    ]
}
```

## License

The MIT License (MIT)

Copyright (c) 2013 Stephen Morrison <srmorrisonjit@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
