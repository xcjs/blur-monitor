/*jslint node: true */
/*jslint esversion: 6 */

'use strict';

var env = require('./environment');
var fs = require('fs');
var fsExtra = require('fs.extra');
var path = require('path');

module.exports = {
    run: run
};

function run(cb) {
    loadDistributorLogo(cb);
}

function loadDistributorLogo(cb) {
    var logoName = 'distributor-logo.png';
    var systemDistributorLogo = path.join('/usr/share/icons/hicolor/48x48/apps', logoName);

    var debugPath = path.join(env.conf.paths.tmp, 'serve', 'assets/img', logoName);
    var releasePath = path.join(env.conf.paths.dist, 'assets/img', logoName);

    try {
        fsExtra.copy(systemDistributorLogo, debugPath, { replace: true }, cb);
        fsExtra.copy(systemDistributorLogo, releasePath, { replace: true }, cb);
    } catch(e) {
        console.error(e);
    }
}
