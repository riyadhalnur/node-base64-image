import {encode, decode} from '../../src/node-base64-image.js';

describe('Base64 Image decode/encode', () => {
  it('should exist', () => {
    should.exist(encode);
    should.exist(decode);
  });

  describe('Encoder', () => {
    it('should return an error if callback is not a function', (done) => {
      let url;
      let options = {};
      let callback;

      (function () {
        encode(url, options, callback);
      }).should.throw(TypeError);

      done();
    });

    it('should return an error if url is null or undefined', (done) => {
      let url;
      let options = {};

      encode(url, options, (err, image) => {
        err.should.exist;
        err.message.should.equal('URL is undefined or not properly formatted');

        should.not.exist(image);
        done();
      });
    });

    it('should return an error if local image could not be loaded', (done) => {
      let url = __dirname + '/noimage.jpg';
      let options = {local: true};

      encode(url, options, (err, image) => {
        err.should.exist;

        should.not.exist(image);
        done();
      });
    });

    it('should return an error if remote image could not be loaded', (done) => {
      let url = 'https://verticalaxisbd.com/noimage.jpg';
      let options = {};

      encode(url, options, (err, image) => {
        err.should.exist;
        err.message.should.equal('Error retrieving image - Status Code 404');

        should.not.exist(image);
        done();
      });
    });

    it('should download an image and return the Base64 encoded string', function (done) {
      let url = 'https://res.cloudinary.com/verticalaxisbd/image/upload/h_239,w_239/rg1kxkgxayhdgoqdaejz.jpg'; // eslint-disable-line
      let options = {string: true};

      encode(url, options, (err, image) => {
        should.not.exist(err);

        image.should.exist;
        image.should.match(/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/);
        done();
      });
    });

    it('should download an image and return the Buffer object by default', function (done) {
      let url = 'https://res.cloudinary.com/verticalaxisbd/image/upload/h_239,w_239/rg1kxkgxayhdgoqdaejz.jpg'; // eslint-disable-line
      let options = {};

      encode(url, options, (err, image) => {
        should.not.exist(err);

        image.should.exist;
        image.should.be.an.instanceOf(Buffer);
        done();
      });
    });

    it('should encode local image and return the Buffer object by default', (done) => {
      let path = __dirname + '/test.jpg';
      let options = {local: true};

      encode(path, options, (err, image) => {
        should.not.exist(err);

        image.should.exist;
        image.should.be.an.instanceOf(Buffer);
        done();
      });
    });

    it('should encode local image and return the Base64 encoded string', (done) => {
      let path = __dirname + '/test.jpg';
      let options = {local: true, string: true};

      encode(path, options, (err, image) => {
        should.not.exist(err);

        image.should.exist;
        image.should.match(/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/);
        done();
      });
    });
  });

  describe('Decoder', () => {
    it('should return an error if image is not a Buffer object', (done) => {
      let imageData;
      let options = {};

      decode(imageData, options, (err, response) => {
        err.should.exist;
        err.message.should.equal('The image is not a Buffer object type');

        should.not.exist(response);
        done();
      });
    });

    it('should decode a Base64 encoded image and save it to disk', (done) => {
      let options = {filename: 'test'};
      let imageData = new Buffer('/9j/4AAQSkZJRgABAQAAAQABAAD/2w//Z', 'base64');

      decode(imageData, options, (err, response) => {
        should.not.exist(err);

        response.should.exist;
        response.should.equal('Image saved successfully to disk!');
        done();
      });
    });
  });
});
