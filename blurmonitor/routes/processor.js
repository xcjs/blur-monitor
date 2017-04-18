/*jslint node: true */

'use strict';

var os = require('os');

module.exports = getRoutes();

function getRoutes() {
    var routes = [];

    routes.push({
        method: 'GET',
        path: '/api/processor',
        config: {
            auth: 'pamToken',
            handler: function (request, reply) {
                return reply(os.cpus());
            }
        }
    });

    routes.push({
        method: 'GET',
        path: '/api/processor/{core}',
        config: {
            auth: 'pamToken',
            handler: function (request, reply) {
                return reply(os.cpus()[request.params.core]);
            }
        }
    });

    routes.push({
        method: 'GET',
        path: '/api/processor/utilization',
        config: {
            auth: 'pamToken',
            handler: function (request, reply) {
                return reply(os.loadavg());
            }
        }
    });

    return routes;
}
