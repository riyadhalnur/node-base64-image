# fnCallback

[src/node-base64-image.js:13-13](https://github.com/riyadhalnur/node-base64-image/blob/48ccb3a785ba53841dc0821548dff8177da7bfb0/src/node-base64-image.js#L13-L13 "Source code on GitHub")

Callback for encode/decode functions

**Parameters**

-   `Error` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** object
-   `Response` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))** string or Buffer object

# encode

[src/node-base64-image.js:27-65](https://github.com/riyadhalnur/node-base64-image/blob/48ccb3a785ba53841dc0821548dff8177da7bfb0/src/node-base64-image.js#L27-L65 "Source code on GitHub")

Encodes a remote or local image to Base64 encoded string or Buffer

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** URL of remote image or local path to image
-   `options` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** Options object for extra configuration (optional, default `{}`)
    -   `options.string` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Returns a Base64 encoded string. Defaults to Buffer object
    -   `options.local` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Encode a local image file instead of a remote image
-   `callback` **fnCallback** Callback function

Returns **fnCallback** Returns the callback

# result

[src/node-base64-image.js:41-41](https://github.com/riyadhalnur/node-base64-image/blob/48ccb3a785ba53841dc0821548dff8177da7bfb0/src/node-base64-image.js#L41-L41 "Source code on GitHub")

# result

[src/node-base64-image.js:58-58](https://github.com/riyadhalnur/node-base64-image/blob/48ccb3a785ba53841dc0821548dff8177da7bfb0/src/node-base64-image.js#L58-L58 "Source code on GitHub")

# decode

[src/node-base64-image.js:77-89](https://github.com/riyadhalnur/node-base64-image/blob/48ccb3a785ba53841dc0821548dff8177da7bfb0/src/node-base64-image.js#L77-L89 "Source code on GitHub")

Decodes an base64 encoded image buffer and saves it to disk

**Parameters**

-   `imageBuffer` **[Buffer](https://nodejs.org/api/buffer.html)** Image Buffer object
-   `options` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** Options object for extra configuration (optional, default `{}`)
    -   `options.filename` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Filename for the final image file
-   `callback` **fnCallback** Callback function

Returns **fnCallback** Returns the callback
