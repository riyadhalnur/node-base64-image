/* @flow */
import request from 'request';
import _ from 'lodash';
import {readFile as read, writeFile as write} from 'fs';

/**
 * Callback for encode/decode functions
 *
 * @callback fnCallback
 * @param {Object} Error object
 * @param {string} Response message
 */
type Callback<T> = (err: ?Error, x?: T) => void;

/**
 *  Encodes a remote or local image to Base64 encoded string or Buffer
 *  @param {string} url - URL of remote image or local path to image
 *  @param {Object} [options={}] - Options object for extra configuration
 *  @param {boolean} options.string - Returns a Base64 encoded string. Defaults to Buffer object
 *  @param {boolean} options.local - Encode a local image file instead of a remote image
 *  @param {fnCallback} callback - Callback function
 *  @todo Option to wrap string every 76 characters for strings larger than 76 characters
 *  @return {fnCallback} - Returns the callback
 */
export function encode(url: string, options: Object = {}, callback: Callback<string>) {
  if (_.isUndefined(url) || _.isNull(url) || !_.isString(url)) {
    return callback(new Error('URL is undefined or not properly formatted'));
  }

  if (!_.isFunction(callback)) {
    return callback(new Error('Callback needs to be a function'));
  }
}

/**
 *  Decodes an base64 encoded image buffer and saves it to disk
 *  @param {Buffer} imageBuffer - Image Buffer object
 *  @param {Object} [options={}] - Options object for extra configuration
 *  @param {string} options.filename - Filename for the final image file
 *  @param {fnCallback} callback - Callback function
 *  @return {fnCallback} - Returns the callback
 */
export function decode(imageBuffer: any, options: Object = {}, callback: Callback<string>) {
  if (!_.isBuffer(imageBuffer)) {
    return callback(new Error('The image is not a Buffer object type'));
  }
}
