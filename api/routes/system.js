/*jslint node: true */
/*jslint esversion: 6 */

'use strict';

var os = require('os');
var exec = require('child_process').exec;

module.exports = getRoutes();

function getRoutes() {
    var routes = [];

    routes.push({
        method: 'GET',
        path: '/api/system',
        handler: function (request, reply) {
            var response = {
                architecture: os.arch(),
                host: os.hostname(),
                platform: os.platform(),
                release: os.release(),
                uptime: os.uptime()
            };

            var promise = new Promise(function (resolve) {
                getDistro().then(function (result) {
                    response.distro = result;
                    resolve(response);
                });
            });

            return reply(promise);
        }
    });

    return routes;
}

function getDistro() {
    var promise = new Promise(function (resolve) {
        // Unescaped command: cat /etc/lsb-release | grep "DISTRIB_DESCRIPTION" | sed -e 's/[^"]*"\([^"]*\)".*/\1/'
        var command =
            "cat /etc/lsb-release | grep \"DISTRIB_DESCRIPTION\" | sed -e 's/[^\"]*\"\\([^\"]*\\)\".*/\\1/'";

        var cb = function (out) {
            resolve(out);
        };

        shell(command, cb);
    });

    return promise;
}

function shell(command, callback) {
    exec(command, function (error, stdout, stderr) {
        var eolLength = os.EOL.length;
        var finalNewLine = stdout.substr(
            stdout.length - eolLength,
            stdout.length);

        if (finalNewLine === os.EOL) {
            stdout = stdout.substr(0, stdout.length - eolLength);
        }

        callback(stdout, stderr, error);
    });
}
