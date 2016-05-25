import {encode, decode} from '../../src/node-base64-image.js';

describe('Base64 Image', () => {
  it('should exist', () => {
    should.exist(encode);
    should.exist(decode);
  });
});
