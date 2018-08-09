/*jslint node: true */

'use strict';

var argv = require('yargs').argv;
var conf = require('../../angular.json');
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
  return argv.p || 3000;
}

function getStaticRoot() {
  var staticRoot = null;

  staticRoot = conf.projects['blur-monitor'].architect.build.options.outputPath;

  return staticRoot;
}




