'use strict';

const AssetHelper = require('../lib/asset-helper.js'),
  assert = require('assert'),
  sinon = require('sinon'),
  fs = require('fs');

describe('asset-helper', () => {

  let sandbox;
  beforeEach(() => sandbox = sinon.sandbox.create());

  afterEach(() => sandbox.restore());

  it('should not accept appendHash flag without a baseDirectory', () => {
    try {
      new AssetHelper({
        appendHash: true
      });
    } catch (e) {
      return;
    }

    throw new Error('It should not be possible to call the constructor with these arguments');
  });

  it('should set a default configuration', () => {
    const assetHelper = new AssetHelper();
    assert.equal(assetHelper.config.appendHash, false);
    assert.equal(assetHelper.config.baseUrl, null);
    assert.equal(assetHelper.config.baseDirectory, null);
  });

  describe('path', () => {
    it('should return the full path to the media asset', () => {
      const assetHelper = new AssetHelper({
        baseUrl: 'https://media.receiptful.com/'
      });

      assert.equal('https://media.receiptful.com/fixtures/file', assetHelper.path('fixtures/file'));
    });

    it('should append the md5 hash as querystring', () => {
      const assetHelper = new AssetHelper({
        baseDirectory: __dirname + '/',
        appendHash: true
      });

      assert.equal('fixtures/file?v=ed797865eeb815b19a9e87746109c7c3', assetHelper.path('fixtures/file'));
    });

    it('should append the md5 hash as querystring with a full path', () => {
      const assetHelper = new AssetHelper({
        baseUrl: 'https://media.example.com/',
        baseDirectory: __dirname + '/',
        appendHash: true
      });

      assert.equal('https://media.example.com/fixtures/file?v=ed797865eeb815b19a9e87746109c7c3', assetHelper.path('fixtures/file'));
    });

    it('should not read the file contents if the hash is cached', () => {
      const fsSpy = sandbox.spy(fs, 'readFileSync');

      const assetHelper = new AssetHelper({
        baseUrl: 'https://media.receiptful.com/',
        baseDirectory: __dirname + '/',
        appendHash: true
      });

      assetHelper.path('fixtures/file2');
      assetHelper.path('fixtures/file2');
      sinon.assert.calledOnce(fsSpy);
    });
  });
});
