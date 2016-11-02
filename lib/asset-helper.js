'use strict';

const fs = require('fs'),
  crypto = require('crypto'),
  NodeCache = require('node-cache');

const cache = new NodeCache({ checkperiod: 0 });

class AssetHelper {
  constructor(config) {
    const defaultConfig = {
      baseUrl: null,
      baseDirectory: null,
      appendHash: false
    };

    this.config = Object.assign({}, defaultConfig, config);
    this.validate(this.config);
  }

  validate(config) {
    if (config.appendHash && !config.baseDirectory) {
      throw new Error('We need a baseDirectory to append an hash to the assets');
    }
  }

  path(filename, options) {
    const config = Object.assign({}, this.config, options || {});
    this.validate(config);

    let resolvedUrl = filename;
    if (config.baseUrl !== null) {
      resolvedUrl = config.baseUrl + resolvedUrl;
    }

    if (config.appendHash) {
      let hash = cache.get(filename);

      if (typeof hash === 'undefined') {
        const content = fs.readFileSync(config.baseDirectory + filename);
        hash = crypto.createHash('md5').update(content).digest('hex');
        cache.set(filename, hash);
      }

      resolvedUrl += '?v=' + hash;
    }

    return resolvedUrl;
  };
}

module.exports = AssetHelper;
