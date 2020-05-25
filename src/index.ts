import axios from 'axios';
import { readFile, writeFile } from 'fs';
import { promisify } from 'util';

const read = promisify(readFile);
const write = promisify(writeFile);

export interface EncodeOptions {
  string?: boolean;
  local?: boolean;
  headers?: {
    [key: string]: string | number;
  }
}

export interface DecodeOptions {
  fname: string;
  ext: string;
}

export async function encode(url: string, opts: EncodeOptions = { string: false }): Promise<string | Buffer> {
  try {
    if (!url || url === '') {
      return Promise.reject(new Error('URL is a required parameter'));
    }

    if (opts.local) {
      const fileBuf = await read(url);
      return opts.string ? fileBuf.toString('base64') : fileBuf;
    }

    const response = await axios(url, {
      responseType: 'arraybuffer',
      headers: opts.headers,
    });

    if (response.data && response.status >= 200 && response.status < 302) {
      const buffData = Buffer.from(response.data, 'base64');
      return opts.string ? buffData.toString('base64') : buffData;
    }

    return Promise.reject(new Error('empty body and/or wrong status code'));
  } catch (err) {
    if (err) {
      return Promise.reject(err);
    }

    return Promise.reject(new Error('unknown error in encode'));
  }
}

export async function decode(imgBuffer: string | Buffer, opts: Required<DecodeOptions>): Promise<string> {
  try {
    if (!imgBuffer || imgBuffer === '' || !opts.fname || !opts.ext) {
      return Promise.reject(new Error('image buffer, filename and extension are required parameters'));
    }

    if (typeof imgBuffer === 'string') {
      imgBuffer = Buffer.from(imgBuffer, 'base64');
    }

    await write(`${opts.fname}.${opts.ext}`, imgBuffer, 'base64');
    return 'file written successfully to disk';
  } catch (err) {
    if (err) {
      return Promise.reject(err);
    }

    return Promise.reject(new Error('unknown error in decode'));
  }
}
