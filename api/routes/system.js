/*jslint node: true */

'use strict';

var os = require('os');

module.exports = getRoutes();

function getRoutes() {
    var routes = [];

    routes.push({
        method: 'GET',
        path: '/api/system',
        handler: function (request, reply) {
            return reply({
                architecture: os.arch(),
                host: os.hostname(),
                platform: os.platform(),
                release: os.release(),
                uptime: os.uptime()
            });
        }
    });

    return routes;
}
