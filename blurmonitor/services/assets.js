/*jslint node: true */

'use strict';

var fs = require('fs');
var path = require('path');
var env = require('../util/environment');

module.exports = {
    getAssets: getAssets
};

function getAssets(type) {
    var assetPath = Array.isArray(env.staticRoot) ?
        path.join('./', env.staticRoot[0], 'assets/img/app') :
        path.join('./', env.staticRoot, 'assets/img/app');

    switch(type) {
        case 'apps': {
            return listDirectory(path.join(assetPath, type));
            break;
        }

        case 'distros': {
            return listDirectory(path.join(assetPath, type));
            break;
        }
    }
}

function listDirectory(path) {
    var promise = new Promise(function (resolve, reject) {
        fs.readdir(path, function(err, assets) {
            var assets = assets.map(function(asset) {
                return(asset.substr(0, asset.lastIndexOf('.')));
            });

            if(!err) {
                resolve(assets);
            } else {
                reject(err);
            }
        });
    });

    return promise;
}
