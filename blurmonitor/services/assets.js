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
        path.join('./', env.staticRoot[1], 'assets/img/app') :
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
            if(!err) {
                var assets = assets.map(function(asset) {
                    return(asset.substr(0, asset.lastIndexOf('.')));
                });

                resolve(assets);
            } else {
                console.error(err);
                reject(err);
            }
        });
    });

    return promise;
}
