/*jslint node: true */
/*jslint esversion: 6 */

'use strict';

var shell = require('./shell');

module.exports = {
    getRelease: getRelease(),
    parse: parseRelease
};

function getRelease() {
    return shell.spawn('lsb_release', ['-a']);
}

function parseRelease(stdout) {
    var lines = stdout.toString().split(/\n/g);
    var lsbRelease = {};

    lines.forEach(function(line) {
        var key = line.substr(0, line.indexOf(':')).trim();
        var value = line.substr(line.indexOf(':') + 1, line.length -1).trim();

        if(key && value) {
            while(value.indexOf('"') > -1) {
                value = value.replace('"', '');
            }

            lsbRelease[key] = value;
        }
    });

    var parsedRelease = {
        id: lsbRelease['Distributor ID'],
        release: lsbRelease['Release'],
        codeName: lsbRelease['Codename'],
        description: lsbRelease['Description']
    };

    return parsedRelease;
}
