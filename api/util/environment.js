/*jslint node: true */

'use strict';

var process = require('process');
var includes = require('array-includes');

var environments = {
    development: 'serve',
    production: 'serve:dist'
};

var currentEnvironment = getCurrentEnvironment();

module.exports = getEnvironment();

function getEnvironment() {
    var env = {
        environments: environments,
        current: getCurrentEnvironment(),
        staticRoot: getStaticRoot()
    };

    return env;
}

function getCurrentEnvironment() {
    var env = null;

    if(includes(process.argv, environments.production)) {
        env = environments.production;
    } else {
        env = environments.development;
    }

    return env;
}

function getStaticRoot() {
    var staticRoot = null;

    if(currentEnvironment === environments.production) {
        staticRoot = './release/';
    } else {
        staticRoot = ['./.tmp/serve/', './src/'];
    }

    return staticRoot;
}




