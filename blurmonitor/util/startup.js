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

function run() {
    loadDistributorLogo();
}

function loadDistributorLogo() {
    var systemDistributorLogo = '/usr/share/icons/hicolor/48x48/apps/distributor-logo.png';

    try {
        var localPath = 'distributor-logo.png';

        if(env.current === env.environments.prod) {
            localPath = path.join(env.conf.paths.tmp, 'serve', 'assets/img', localPath);
        } else {
            localPath = path.join(env.conf.paths.dist, 'assets/img', localPath);
        }

        fsExtra.copy(systemDistributorLogo, localPath, { replace: true });
    } catch(e) {
        console.error(e);
    }
}
