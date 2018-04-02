# [nano-clipboard](http://np.hust.cc/nano-clipboard) [![npm](https://img.shields.io/npm/v/nano-clipboard.svg)](https://www.npmjs.com/package/nano-clipboard)

> Copied and translated to ES5 from [copy-text-to-clipboard](https://github.com/sindresorhus/copy-text-to-clipboard), and add backup copy method.


## How to use

```js
// import library use script tag.
<script type="text/javascript" src="./index.js"></script>

// or
const nanoClipboard = require('nano-clipboard');

// or
import nanoClipboard from 'nano-clipboard';

// copy the string into clipboard, when failed, use prompt instead.
var success = nanoClipboard('Hello, world', true);
```

Function `nanoClipboard` has 2 parameters.

 - **text**: text to be copied.
 - **usePrompt**: when copy failed, use window.prompt to instead. Default `false`.


## MIT

MIT@[hustcc](https://github.com/hustcc)
