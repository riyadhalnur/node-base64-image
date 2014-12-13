'use strict';

var should = require('should');
var base64Image = require('../index');

describe('Image download and encode/decode to Base64', function () {
  describe('Base64 encoder', function () {
    it('should throw an error if callback is not a function', function (done) {
      var url, options, callback;

      var helperFunc = function () {
       base64Image.base64encoder(url, options, callback);
      };

      helperFunc.should.throw(Error);
      helperFunc.should.throw('Callback needs to be a function!');

      done();
    });

    it('should throw an error if url is null or undefined', function (done) {
      var url = undefined, options;

      var helperFunc = function () {
       base64Image.base64encoder(url, options, function (err, image) {
        err.should.exist;
        image.should.not.exist;
       });
      };

      helperFunc.should.throw(Error);
      helperFunc.should.throw('URL cannot be empty!');

      done();
    });

    it('should download an image and return base64 encoded Buffer', function (done) {
      this.timeout(15000);

      var url = 'http://www.pctools.com/security-news/wp-content/uploads/2011/09/code.jpg', options = {};

      base64Image.base64encoder(url, options, function (err, image) {
        should.not.exist(err);

        image.should.exist;
        image.should.be.an.instanceOf(Buffer);
        
        done();
      });
    });

    it('should download an image and return base64 encoded string', function (done) {
      this.timeout(15000);

      var url = 'http://www.pctools.com/security-news/wp-content/uploads/2011/09/code.jpg', options = {string: true};

      base64Image.base64encoder(url, options, function (err, image) {
        should.not.exist(err);

        image.should.exist;
        image.should.match(/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/);

        done();
      });
    });
  });
});