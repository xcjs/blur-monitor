/*jslint node: true */
/*jslint esversion: 6 */

'use strict';

var shell = require('./shell');

module.exports = {
    getRelease: getRelease(),
    parse: parseRelease
};

function getRelease() {
    return shell.spawn('cat', ['/etc/lsb-release']);
}

function parseRelease(stdout) {
    var lines = stdout.toString().split(/\n/g);
    var lsbRelease = {};

    lines.forEach(function(line) {
        var key = line.substr(0, line.indexOf('='));
        var value = line.substr(line.indexOf('=') + 1, line.length -1);

        if(key && value) {
            while(value.indexOf('"') > -1) {
                value = value.replace('"', '');
            }

            lsbRelease[key] = value;
        }
    });

    lsbRelease = {
        id: release.DISTRIB_ID,
        release: release.DISTRIB_RELEASE,
        codeName: release.DISTRIB_CODENAME,
        description: release.DISTRIB_DESCRIPTION
    };

    return lsbRelease;
}
