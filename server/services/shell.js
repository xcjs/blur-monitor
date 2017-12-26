/*jslint node: true */
/*jslint esversion: 6 */

'use strict';

var childProcess = require('child_process');

var exec = childProcess.exec;
var spawn = childProcess.spawn;

module.exports = {
    exec: execWrapper,
    spawn: spawnWrapper
};

function execWrapper(command) {
    var promise = new Promise(function(resolve, reject) {
        exec(command, function(error, stdout, stderr) {
            if (error) {
                reject('Attempting to execute command "' + command + '" failed: ' + error);
                return;
            }

            if(stderr) {
                console.error('Command: "' + command + '" executed, but failed with an error code: ' + stderr);
            }

            resolve(stdout);
        });
    });

    return promise;
}

function spawnWrapper(command, args) {
    var process = spawn(command, args);

    var promise = new Promise(function(resolve, reject) {
        process.stdout.setEncoding("utf8");

        process.stdout.on('data', function(stdout) {
            resolve(stdout);
        });

        process.stderr.on('data', function(stderr) {
            console.error(stderr);
        });

        process.on('close', function(code) {
            if (code !== 0) {
                reject('Command "' + command + '" failed. Please check for earlier errors.');
            }
        });
    });

    return promise;
}
