/*jslint node: true */

'use strict';

var os = require('os');

module.exports = getRoutes();

function getRoutes() {
    var routes = [];

    routes.push({
        method: 'GET',
        path: '/api/memory',
        handler: function (request, reply) {
            return reply({
                used: os.freemem(),
                total: os.totalmem(),
                free: os.totalmem() - os.freemem()
            });
        }
    });

    return routes;
}
