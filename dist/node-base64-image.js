'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encode = encode;
exports.decode = decode;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Encodes a remote or local image to Base64 encoded string or Buffer
 *
 *  @name encode
 *  @param {string} url - URL of remote image or local path to image
 *  @param {Object} [options={}] - Options object for extra configuration
 *  @param {boolean} options.string - Returns a Base64 encoded string. Defaults to Buffer object
 *  @param {boolean} options.local - Encode a local image file instead of a remote image
 *  @param {fnCallback} callback - Callback function
 *  @todo Option to wrap string every 76 characters for strings larger than 76 characters
 *  @return {fnCallback} - Returns the callback
 */


/**
 * Callback for encode/decode functions
 *
 * @callback fnCallback
 * @param {Object} Error object
 * @param {(string|Object)} Response string or Buffer object
 */
function encode(url) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? { string: false, local: false } : arguments[1];
  var callback = arguments[2];
  // eslint-disable-line
  if (_lodash2.default.isUndefined(url) || _lodash2.default.isNull(url) || !_lodash2.default.isString(url)) {
    return callback(new Error('URL is undefined or not properly formatted'));
  }

  if (options.local) {
    (0, _fs.readFile)(url, function (err, body) {
      if (err) {
        return callback(err);
      }

      /**
       * @todo Handle this better.
       */
      var result = options.string ? body.toString('base64') : new Buffer(body, 'base64');
      return callback(null, result);
    });
  } else {
    (0, _request2.default)({ url: url, encoding: null }, function (err, response, body) {
      if (err) {
        return callback(err);
      }

      if (!body) {
        return callback(new Error('Error retrieving image - Empty Body!'));
      }

      if (body && response.statusCode === 200) {
        /**
         * @todo Handle this better.
         */
        var result = options.string ? body.toString('base64') : new Buffer(body, 'base64');
        return callback(null, result);
      }

      return callback(new Error('Error retrieving image - Status Code ' + response.statusCode));
    });
  }
}

/**
 *  Decodes an base64 encoded image buffer and saves it to disk
 *
 *  @name decode
 *  @param {Buffer} imageBuffer - Image Buffer object
 *  @param {Object} [options={}] - Options object for extra configuration
 *  @param {string} options.filename - Filename for the final image file
 *  @param {fnCallback} callback - Callback function
 *  @return {fnCallback} - Returns the callback
 */
function decode(imageBuffer) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? { filename: 'saved-image' } : arguments[1];
  var callback = arguments[2];
  // eslint-disable-line
  if (!_lodash2.default.isBuffer(imageBuffer)) {
    return callback(new Error('The image is not a Buffer object type'));
  }

  (0, _fs.writeFile)(options.filename + '.jpg', imageBuffer, 'base64', function (err) {
    if (err) {
      return callback(err);
    }

    return callback(null, 'Image saved successfully to disk!');
  });
}

var base64 = {
  encode: encode,
  decode: decode
};

exports.default = base64;