/*jslint node: true */

'use strict';

var os = require('os');

module.exports = getRoutes();

function getRoutes() {
    var routes = [];

    routes.push({
        method: 'GET',
        path: '/api/network',
        handler: function (request, reply) {
            return reply(os.networkInterfaces());
        }
    });

    routes.push({
        method: 'GET',
        path: '/api/network/{interface}',
        handler: function (request, reply) {
            return reply(os.networkInterfaces()[request.params.interface]);
        }
    });

    return routes;
}
