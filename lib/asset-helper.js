'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    crypto = require('crypto'),
    NodeCache = require('node-cache');

var cache = new NodeCache({ checkperiod: 0 });

var AssetHelper = function(config) {
  var defaultConfig = {
    baseUrl: null,
    baseDirectory: null,
    appendHash: false
  };

  this.config = _.merge(defaultConfig, config);

  if (this.config.appendHash && !this.config.baseDirectory) {
    throw new Error('We need a baseDirectory to append an hash to the assets');
  }
};

AssetHelper.prototype.path = function(filename) {
  var resolvedUrl = filename;

  if (this.config.baseUrl !== null) {
    resolvedUrl = this.config.baseUrl + resolvedUrl;
  }

  if (this.config.appendHash) {
    var content = fs.readFileSync(this.config.baseDirectory + filename);

    var hash = cache.get(filename)[filename];

    if (typeof hash === 'undefined') {
      var shasum = crypto.createHash('md5');
      shasum.update(content);

      hash = shasum.digest('hex');

      cache.set(filename, hash);
    }

    resolvedUrl += '?v=' + hash;
  }

  return resolvedUrl;
};

module.exports = AssetHelper;
