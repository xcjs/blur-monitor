/*jslint node: true */

'use strict';

var os = require('os');
var spawn = require('child_process').spawn;

module.exports = getRoutes();

function getRoutes() {
    var routes = [];

    routes.push({
        method: 'GET',
        path: '/api/memory',
        config: {
            auth: 'pamToken',
            handler: function (request, reply) {
                return reply(getMemoryStats());
            }
        }
    });

    return routes;
}

function getMemoryStats() {
    var free = spawn('free', ['-m']);

    var promise;
    promise = new Promise(function (resolve) {
        free.stdout.setEncoding("utf8");
        free.stdout.on('data', function (stdout) {
            resolve(parseFree(stdout));
        });
    });

    return promise;
}

function parseFree(stdout) {
    if(stdout.indexOf('available') > -1) {
        // >= 3.3.10
        return parseNewFree(stdout);
    } else {
        // < 3.3.10
        return parseOldFree(stdout);
    }
}

function parseOldFree(stdout) {
    var lines = stdout.toString().split(/\n/g);

    var line1 = lines[1].split(/\s+/);
    var line3 = lines[3].split(/\s+/);

    var total = parseInt(line1[1], 10);
    var free = parseInt(line1[3], 10);

    // buffers + cache
    var cache = parseInt(line1[5], 10) + parseInt(line1[6], 10);

    var available = free + cache;
    var used = total - available;

    var shared = parseInt(line1[4], 10);

    var swapTotal = parseInt(line3[1], 10);
    var swapUsed = parseInt(line3[2], 10);
    var swapFree = parseInt(line3[3], 10);

    return {
        total: total,
        used: used,
        free: free,
        cache: cache,
        available: available,
        shared: shared,
        swap: {
            total: swapTotal,
            used: swapUsed,
            free: swapFree
        }
    };
}

function parseNewFree(stdout) {
    var lines = stdout.toString().split(/\n/g);

    var line1 = lines[1].split(/\s+/);
    var line2 = lines[2].split(/\s+/);

    var total = parseInt(line1[1], 10);
    var used = parseInt(line1[2], 10);

    var free = parseInt(line1[3], 10);
    var cache = parseInt(line1[5], 10);

    var available = parseInt(line1[6], 10);

    var shared = parseInt(line1[4], 10);

    var swapTotal = parseInt(line2[1], 10);
    var swapUsed = parseInt(line2[2], 10);
    var swapFree = parseInt(line2[3], 10);

    return {
        total: total,
        used: used,
        free: free,
        cache: cache,
        available: available,
        shared: shared,
        swap: {
            total: swapTotal,
            used: swapUsed,
            free: swapFree
        }
    };
}
