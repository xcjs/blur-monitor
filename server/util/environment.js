/*jslint node: true */

'use strict';

var argv = require('yargs').argv;
var path = require('path');

module.exports = getEnvironment();

function getEnvironment() {
    var env = {
        port: getPort(),
        staticRoot: getStaticRoot()
    };

    return env;
}

function getPort() {
    return argv.p || 3201;
}

function getStaticRoot() {
    var staticRoot = path.join(__dirname, '../../dist');

    return staticRoot;
}
