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
    const block = () => {
      new AssetHelper({
        appendHash: true
      });
    };

    assert.throws(block);
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
        baseUrl: 'https://media.example.com/'
      });

      const path = assetHelper.path('fixtures/file')
      assert.equal(path, 'https://media.example.com/fixtures/file');
    });

    it('should append the md5 hash as querystring', () => {
      const assetHelper = new AssetHelper({
        baseDirectory: __dirname + '/',
        appendHash: true
      });

      const path = assetHelper.path('fixtures/file')
      assert.equal(path, 'fixtures/file?v=ed797865eeb815b19a9e87746109c7c3');
    });

    it('should append the md5 hash as querystring with a full path', () => {
      const assetHelper = new AssetHelper({
        baseUrl: 'https://media.example.com/',
        baseDirectory: __dirname + '/',
        appendHash: true
      });

      const path = assetHelper.path('fixtures/file');
      assert.equal(path, 'https://media.example.com/fixtures/file?v=ed797865eeb815b19a9e87746109c7c3');
    });

    it('should not read the file contents if the hash is cached', () => {
      const fsSpy = sandbox.spy(fs, 'readFileSync');

      const assetHelper = new AssetHelper({
        baseUrl: 'https://media.example.com/',
        baseDirectory: __dirname + '/',
        appendHash: true
      });

      assetHelper.path('fixtures/file2');
      assetHelper.path('fixtures/file2');
      sinon.assert.calledOnce(fsSpy);
    });

    context('given extra path options', () => {
      it('should allow disable appendHash', () => {
        const assetHelper = new AssetHelper({
          baseUrl: 'https://media.example.com/',
          baseDirectory: __dirname + '/',
          appendHash: true
        });

        // Test with options
        let path = assetHelper.path('fixtures/file', { appendHash: false });
        assert.equal(path, 'https://media.example.com/fixtures/file');

        // Test the opposite (without options)
        path = assetHelper.path('fixtures/file');
        assert.equal(path, 'https://media.example.com/fixtures/file?v=ed797865eeb815b19a9e87746109c7c3');
      });

      it('should allow enabling appendHash', () => {
        const assetHelper = new AssetHelper({
          baseUrl: 'https://media.example.com/',
          baseDirectory: __dirname + '/',
          appendHash: false
        });

        // Test with options
        let path = assetHelper.path('fixtures/file', { appendHash: true });
        assert.equal(path, 'https://media.example.com/fixtures/file?v=ed797865eeb815b19a9e87746109c7c3');

        // Test the opposite (without options)
        path = assetHelper.path('fixtures/file');
        assert.equal(path, 'https://media.example.com/fixtures/file');
      });

      it('should not accept enabling appendHash if baseDirectory is missing', () => {
        const assetHelper = new AssetHelper({
          baseUrl: 'https://media.example.com/',
          appendHash: false
        });

        const block = () => {
          assetHelper.path('fixtures/file', { appendHash: true });
        };

        assert.throws(block);
      });
    });
  });
});
