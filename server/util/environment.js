/*jslint node: true */

'use strict';

var argv = require('yargs').argv;
var conf = require('../../gulp/conf');
var path = require('path');

var environments = {
    dev: 'dev',
    prod: 'prod'
};

var currentEnvironment = getCurrentEnvironment();

module.exports = getEnvironment();

function getEnvironment() {
    var env = {
        conf: conf,
        environments: environments,
        current: getCurrentEnvironment(),
        port: getPort(),
        staticRoot: getStaticRoot()
    };

    return env;
}

function getCurrentEnvironment() {
    if(argv.e === environments.dev) {
        return environments.dev;
    } else {
        return environments.prod;
    }
}

function getPort() {
    return argv.p || 3201;
}

function getStaticRoot() {
    var staticRoot = null;

    if(currentEnvironment === environments.prod) {
        staticRoot = conf.paths.dist;
    } else {
        staticRoot = [path.join(conf.paths.tmp, 'serve'), conf.paths.src];
    }

    return staticRoot;
}
