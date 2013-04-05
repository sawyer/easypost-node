
# easypostjs <sup>[![Version Badge](http://vb.teelaun.ch/easypost/easypost-node.svg)](https://npmjs.org/package/easypostjs)</sup>

EasyPost API wrapper and command line utility for node.js.

Built by the support team at [Teelaunch](https://teelaunch.com).

[![Teelaunch](http://cdn.teelaun.ch/img/teelaunch-logo.png)](https://teelaunch.com)

## Command Line Usage

```bash
npm install -g easypostjs
easypost --help
```

Example:

```bash
easypost <your-api-key>

Choose an option:
  1) Verify a single address
  2) Verify multiple addresses
  3) Get multiple shipment rates
  4) Get shipment rates
  5) Buy postage
  6) Lookup individual label purchased
  7) Get full list of labels purchased
  :
```


## API Usage

```bash
npm install easypostjs
```

Example:

```js
var easypost = require('easypostjs')('your-api-key')

// Verify an address
easypost.address.verify(data, cb)
function cb(err, response) {
  if (err) return console.log(err)
  console.log(response)
}
```


## API

All methods take a `data` object as their first parameter and a `callback(err, response)` as their last parameter.

* `easypost.address.verify` - Verify an address with the USPS
* `easypost.postage.rates` - Get postage rates for a shipment
* `easypost.postage.buy` - Buy postage for a shipment
* `easypost.postage.get` - Get previous postage information

Documentation is available at: <https://www.geteasypost.com/docs>


## Tests

To run tests, install `vows`:

```bash
npm install vows
```

Then run:

```bash
EASYPOST=your-api-key vows test/*
```


## Contributors

* Nick Baugh <niftylettuce@gmail.com>


## License

The MIT License

Copyright (c) 2013- Teelaunch, LLC. (https://teelaunch.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
