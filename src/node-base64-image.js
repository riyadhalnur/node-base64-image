/* @flow */
import request from 'request';
import _ from 'lodash';
import {readFile as read, writeFile as write} from 'fs';

/**
 * Callback for encode/decode functions
 *
 * @callback fnCallback
 * @param {Object} Error object
 * @param {(string|Object)} Response string or Buffer object
 */
type Callback<T> = (err: ?Error, x?: T) => void;

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
export function encode(url: string, options: Object = {string: false, local: false}, callback: Callback<mixed>) { // eslint-disable-line
  if (_.isUndefined(url) || _.isNull(url) || !_.isString(url)) {
    return callback(new Error('URL is undefined or not properly formatted'));
  }

  if (options.local) {
    read(url, (err, body) => {
      if (err) {
        return callback(err);
      }

      /**
       * @todo Handle this better.
       */
      let result = options.string ? body.toString('base64') : new Buffer(body, 'base64');
      return callback(null, result);
    });
  } else {
    request({ url: url, encoding: null }, (err, response, body) => {
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
        let result = options.string ? body.toString('base64') : new Buffer(body, 'base64');
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
export function decode(imageBuffer: any, options: Object = {filename: 'saved-image'}, callback: Callback<mixed>) { // eslint-disable-line
  if (!_.isBuffer(imageBuffer)) {
    return callback(new Error('The image is not a Buffer object type'));
  }

  write(options.filename + '.jpg', imageBuffer, 'base64', (err) => {
    if (err) {
      return callback(err);
    }

    return callback(null, 'Image saved successfully to disk!');
  });
}

const base64 = {
  encode: encode,
  decode: decode
};

export default base64;
