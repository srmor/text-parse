var should = require('should'),
    parse = require('..'),
    fs = require('fs'),
    read = fs.readFileSync;

describe('parse', function() {
  it('should parse test.txt', function() {
    var text = read('test/lib/test.txt', 'utf8');
    var json = read('test/lib/test.json', 'utf8');
    var result = parse(text);
    result = JSON.stringify(result, null, 2);
    result.should.equal(json);
  });
});