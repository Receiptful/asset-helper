# Asset Helper

[![Build Status](https://travis-ci.org/Receiptful/asset-helper.svg?branch=master)](https://travis-ci.org/Receiptful/asset-helper)

A simple and easy to use module to manage asset path and versions.

## Installation

Install the module through NPM:

    $ npm install asset-helper --save

**Requires Node 4 or above**

## Examples

Include the module and create a new `AssetHelper` object:

```javascript
const AssetHelper = require('asset-helper');

// Will output style/main.css
const assetHelper = new AssetHelper();
console.log(assetHelper.path('style/main.css')); 

// Will output http://www.foo.com/style/main.css
const assetHelperWithBaseUrl = new AssetHelper({
  baseUrl: 'http://www.foo.com/'
});
console.log(assetHelperWithBaseUrl.path('style/main.css')); 

// Will output /style/main.css?v=3094302hdhsd9fu9023
const assetHelperWithHash = new AssetHelper({
  baseDirectory: __dirname + '/../public/',
  appendHash: true
});
console.log(assetHelperWithHash.path('style/main.css'));

// You can override configuration params on individual calls:
// Will output /style/main.css
console.log(assetHelperWithHash.path('style/main.css', { appendHash: false }));
```

## Configuration options

### baseUrl

It will prepend a base url to your asset. Useful in case you use a CDN and want the local path when on development environment.

### baseDirectory

Needed for calculating the hash, it should point to your asset main directory.

### appendHash

It will append a querystring with a MD5 calculated on file content.

## Testing

    $ npm test

## Contributing

This module was originally written to be used with Receiptful and is used in a production environment currently. This will ensure that this module is well maintained, bug free and as up to date as possible.

Receiptful's developers will continue to make updates as often as required to have a consistently bug free platform, but we are happy to review any feature requests or issues and are accepting constructive pull requests.
