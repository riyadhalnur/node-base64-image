![Node.js Package](https://github.com/riyadhalnur/node-base64-image/workflows/Node.js%20Package/badge.svg?branch=master)  
![NPM Version](https://img.shields.io/npm/v/node-base64-image)
![NPM Downloads](https://img.shields.io/npm/dw/node-base64-image)
# node-base64-image

Easily encode images (from URLs or local files) to Base64 strings or [Buffer](https://nodejs.org/api/buffer.html) objects, and decode them back into image files.

### Installation
```
npm install node-base64-image --save
```

Usage
-----
```js
// CommonJS:
const { encode, decode } = require('node-base64-image');

// ES Modules / TypeScript:
import { encode, decode } from 'node-base64-image';
```

EncodeOptions
---
| Attribute | Type     | Description                                | Default Value |
|-----------|----------|--------------------------------------------|---------------|
| string    | boolean  | If true, returns a base64 string            | false         |
| local     | boolean  | Set to true to read from a local file       | -             |
| timeout   | number   | Request timeout in milliseconds             | 5000          |
| headers   | object   | Optional headers for remote HTTP requests   | -             |


DecodeOptions (Required)
---
| Attribute | Type   | Description                           | Default Value |
|-----------|--------|---------------------------------------|---------------|
| fname     | string | Output filename (without extension)   | -             |
| ext       | string | File extension (e.g., jpg, png)       | -             |

Examples
--------
```js
// encoding a remote jpg to base64
const url = 'https://example.com/test.jpg';
const options = {
  string: true,
  headers: {
    "User-Agent": "my-app"
  }
};
const image = await encode(url, options);

// encoding a local file
const localUrl = 'C:/project/test.jpg';
const localImage = await encode(url, {string: true, local: true});

// writing to file named 'example.jpg'
await decode(image, { fname: 'example', ext: 'jpg' });

// writing to a sub-directory
// after creating a directory called 'photos'
const image = await encode(url, options);
await decode(image, { fname: './photos/example', ext: 'jpg' });
```

### Contributing
Read the [CONTRIBUTING](CONTRIBUTING.md) guide for information.  

### License
Licensed under MIT. See [LICENSE](LICENSE) for more information.  

### Issues
Report a bug in [issues](https://github.com/riyadhalnur/node-base64-image/issues)

Made with love in Dhaka, Bangladesh by [Riyadh Al Nur](https://verticalaxisbd.com)
