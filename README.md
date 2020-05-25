![Node.js Package](https://github.com/riyadhalnur/node-base64-image/workflows/Node.js%20Package/badge.svg?branch=master)  

node-base64-image
=================

Download images from remote URLs or use local images and encode/decode them to Base64 string or [Buffer](https://nodejs.org/api/buffer.html) object

### Installation  
`npm i node-base64-image --save`  

### Usage  
```js
const base64 = require('node-base64-image');
// or
import {encode, decode} from 'node-base64-image';
```   

### Examples
```js
const url = 'https://example.com/test.jpg';
const options = {
  string: true,
  headers: {
    "User-Agent": "my-app"
  }
};

const image = await encode(url, options);
await decode(image, { fname: 'example', ext: 'jpg' });
```  

### Contributing
Read the [CONTRIBUTING](CONTRIBUTING.md) guide for information.  

### License  
Licensed under MIT. See [LICENSE](LICENSE) for more information.  

### Issues  
Report a bug in issues.   

Made with love in Dhaka, Bangladesh by [Riyadh Al Nur](https://verticalaxisbd.com)
