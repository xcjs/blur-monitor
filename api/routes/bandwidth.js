/*jslint node: true */

'use strict';

var randomstring = require('randomstring');

module.exports = getRoutes();

function getRoutes() {
    var routes = [];

    routes.push({
        method: 'GET',
        path: '/api/bandwidth',
        handler: function (request, reply) {
            return reply(randomstring.generate(10000000)) // ~10 MB
                .header('Content-Type', 'text/plain');
        }
    });

    return routes;
}
