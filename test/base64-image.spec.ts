import { encode, decode } from '../src/index';

describe('Base64 Image Decode/Encode', () => {
  describe('Encode', () => {
    it('should return an error if url is null or undefined', async () => {
      await expect(encode('', {})).rejects.toThrow('URL is a required parameter');
    });

    it('should return an error if local image could not be loaded', async () => {
      const url = __dirname + '/noimage.jpg';
      const options = {local: true};

      await expect(encode(url, options)).rejects.toThrow('ENOENT: no such file or directory');
    });

    it('should return an error if remote image could not be loaded', async () => {
      const url = 'https://verticalaxisbd.com/noimage.jpg';
      const options = {};

      await expect(encode(url, options)).rejects.toThrow('Request failed with status code 404');
    });

    it('should download an image and return the Base64 encoded string', async () => {
      const url = 'https://verticalaxisbd.com/img/gopher.webp';
      const options = {string: true};

      const image = await encode(url, options);
      expect(image).toMatch(/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/);
    });

    it('should download an image and return the Buffer object by default', async () => {
      const url = 'https://verticalaxisbd.com/img/gopher.webp';
      const options = {};

      const image = await encode(url, options);
      expect(image).toBeInstanceOf(Buffer);
    });

    it('should encode local image and return the Buffer object by default', async () => {
      const path = __dirname + '/test.jpg';
      const options = {local: true};

      const image = await encode(path, options);
      expect(image).toBeInstanceOf(Buffer);
    });

    it('should encode local image and return the Base64 encoded string', async () => {
      const path = __dirname + '/test.jpg';
      const options = {local: true, string: true};

      const image = await encode(path, options);
      expect(image).toMatch(/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/);
    });
  });

  describe('Decode', () => {
    it('should return an error if required parameters are not passed in', async () => {
      const options = { fname: 'test', ext: 'jpg' };

      await expect(decode('', options)).rejects.toThrow('image buffer, filename and extension are required parameters');
    });

    it('should decode a Base64 encoded image and save it to disk', async () => {
      const options = {fname: 'test', ext: 'jpg'};
      const imageData = Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/2w//Z', 'base64');

      const res = await decode(imageData, options);
      expect(res).toEqual('file written successfully to disk');
    });
  });
});
