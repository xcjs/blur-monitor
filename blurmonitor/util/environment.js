/*jslint node: true */

'use strict';

var argv = require('yargs').argv;

var environments = {
    dev: 'dev',
    prod: 'prod'
};

var currentEnvironment = getCurrentEnvironment();

module.exports = getEnvironment();

function getEnvironment() {
    var env = {
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
    return argv.p || 3000;
}

function getStaticRoot() {
    var staticRoot = null;

    if(currentEnvironment === environments.prod) {
        staticRoot = './release/';
    } else {
        staticRoot = ['./.tmp/serve/', './src/'];
    }

    return staticRoot;
}




