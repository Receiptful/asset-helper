'use strict';

var AssetHelper = require('../lib/asset-helper.js'),
    assert = require('assert');

describe('asset-helper', function() {
  it('should not accept appendHash flag without a baseDirectory', function() {
    try {
      var assetHelper = new AssetHelper({
        appendHash: true
      });
    } catch(e) {
      return;
    }

    throw new Error('It should not be possible to call the constructor with these arguments');
  });

  describe('path', function () {
    it('should return the full path to the media asset', function() {
      var assetHelper = new AssetHelper({
        baseUrl: 'https://media.receiptful.com/'
      });

      assert.equal('https://media.receiptful.com/fixtures/file', assetHelper.path('fixtures/file'));
    });
    it('should append the md5 hash as querystring', function() {
      var assetHelper = new AssetHelper({
        baseDirectory: __dirname + '/',
        appendHash: true
      });

      assert.equal('fixtures/file?v=ed797865eeb815b19a9e87746109c7c3', assetHelper.path('fixtures/file'));
    });
    it('should append the md5 hash as querystring with a full path', function() {
      var assetHelper = new AssetHelper({
        baseUrl: 'https://media.receiptful.com/',
        baseDirectory: __dirname + '/',
        appendHash: true
      });

      assert.equal('https://media.receiptful.com/fixtures/file?v=ed797865eeb815b19a9e87746109c7c3', assetHelper.path('fixtures/file'));
    });
  });
});
