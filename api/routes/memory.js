/*jslint node: true */

'use strict';

var os = require('os');
var spawn = require("child_process").spawn;

module.exports = getRoutes();

function getRoutes() {
    var routes = [];

    routes.push({
        method: 'GET',
        path: '/api/memory',
        handler: function (request, reply) {
            return reply(getMemoryStats());
        }
    });

    return routes;
}

function getMemoryStats() {
    var free = spawn('free', []);

    var promise = new Promise(function (resolve) {
        free.stdout.setEncoding("utf8");
        free.stdout.on('data', function (data) {
            var lines = data.toString().split(/\n/g),
                line1 = lines[1].split(/\s+/),
                line3 = lines[3].split(/\s+/),
                total = parseInt(line1[1], 10),
                free = parseInt(line1[3], 10),
                buffers = parseInt(line1[5], 10),
                cached = parseInt(line1[6], 10),
                actualFree = free + buffers + cached,
                actualUsed = total - actualFree,
                swapTotal = parseInt(line3[1], 10),
                swapUsed = parseInt(line3[2], 10),
                swapFree = parseInt(line3[3], 10),
                memory = {
                    total: total,
                    used: parseInt(line1[2], 10),
                    free: free,
                    shared: parseInt(line1[4], 10),
                    buffers: buffers,
                    cached: cached,
                    actualUsed: actualUsed,
                    actualFree: actualFree,
                    swapTotal: swapTotal,
                    swapUsed: swapUsed,
                    swapFree: swapFree
                };

            resolve(memory);
        });
    });

    return promise;
}
