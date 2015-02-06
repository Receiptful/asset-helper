# Asset Helper

A simple and easy to use module to manage asset path and versions.

## Installation

Install the module through NPM:

    $ npm install asset-helper --save

## Examples

Include the module and create a new `AssetHelper` object:

```javascript
var AssetHelper = require('asset-helper');

var assetHelper = new AssetHelper();
console.log(assetHelper.path('style/main.css')); // Will output style/main.css

var assetHelperWithBaseUrl = new AssetHelper({
  baseUrl: 'http://www.foo.com/'
});
console.log(assetHelperWithBaseUrl.path('style/main.css')); // Will output http://www.foo.com/style/main.css

var assetHelperWithHash = new AssetHelper({
  baseDirectory: __dirname + '/../public/'
});
console.log(assetHelperWithHash.path('style/main.css')); // Will output /style/main.css?v=3094302hdhsd9fu9023
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
