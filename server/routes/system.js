/*jslint node: true */
/*jslint esversion: 6 */

'use strict';

var os = require('os');
var lsbRelease = require('../services/lsb-release');

module.exports = getRoutes();

function getRoutes() {
    var routes = [];

    routes.push({
        method: 'GET',
        path: '/api/system',
        config: {
            auth: 'pamToken',
            handler: function (request, reply) {
                var response = {
                    architecture: os.arch(),
                    host: os.hostname(),
                    platform: os.platform(),
                    release: os.release(),
                    uptime: os.uptime()
                };

                var promise = new Promise(function (resolve) {
                    lsbRelease.getRelease.then(function (release) {
                        response.distro = lsbRelease.parse(release);
                        resolve(response);
                    });
                });

                return reply(promise);
            }
        }
    });

    return routes;
}
