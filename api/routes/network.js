/*jslint node: true */

'use strict';

var os = require('os');
var spawn = require("child_process").spawn;

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

    routes.push({
        method: 'GET',
        path: '/api/network/external',
        handler: function(request, reply) {
            return reply(getExternalIp());
        }
    });

    return routes;
}

function getExternalIp() {
    var dig = spawn('dig', ['+short', 'myip.opendns.com', '@resolver1.opendns.com']);
    dig.stdout.setEncoding("utf8");

    var promise = new Promise(function(resolve) {
        dig.stdout.on('data', function(data) {
            var external = {
                ipAddress: data.trim()
            };

            resolve(external);
        });
    });

    return promise;
}
