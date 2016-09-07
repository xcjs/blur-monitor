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
                    release = lsbRelease.parse(release);

                    response.distro = {};
                    response.distro.id = release.DISTRIB_ID;
                    response.distro.release = release.DISTRIB_RELEASE;
                    response.distro.codeName = release.DISTRIB_CODENAME;
                    response.distro.description = release.DISTRIB_DESCRIPTION;

                    resolve(response);
                });
            });

            return reply(promise);
        }
    });

    return routes;
}
