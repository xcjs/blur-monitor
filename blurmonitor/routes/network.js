/*jslint node: true */

'use strict';

var os = require('os');
var spawn = require("child_process").spawn;
var shell = require('../services/shell');

module.exports = getRoutes();

function getRoutes() {
    var routes = [];

    routes.push({
        method: 'GET',
        path: '/api/network',
        config: {
            auth: 'pamToken',
            handler: function (request, reply) {
                return reply(os.networkInterfaces());
            }
        }
    });

    routes.push({
        method: 'GET',
        path: '/api/network/{interface}',
        config: {
            auth: 'pamToken',
            handler: function (request, reply) {
                return reply(os.networkInterfaces()[request.params.interface]);
            }
        }
    });

    routes.push({
        method: 'GET',
        path: '/api/network/external',
        config: {
            auth: 'pamToken',
            handler: function(request, reply) {
                return reply(getExternalIp());
            }
        }
    });

    routes.push({
        method: 'GET',
        path: '/api/network/traceroute',
        config: {
            auth: 'pamToken',
            handler: function(request, reply) {
                var origin = request.headers['x-forwarded-for'] || request.info.remoteAddress;

                return reply(getTraceRoute(origin.trim()));
            }
        }
    });

    routes.push({
        method: 'GET',
        path: '/api/network/bandwidth',
        config: {
            auth: 'pamToken',
            handler: function(request, reply) {
                return reply(getBandwithUtilization());
            }
        }
    });

    return routes;
}

function getExternalIp() {
    var dig = spawn('dig', ['+short', 'myip.opendns.com', '@resolver1.opendns.com']);
    dig.stdout.setEncoding('utf8');

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

function getTraceRoute(origin) {
    var traceroute = spawn('traceroute', [origin]);
    traceroute.stdout.setEncoding('utf8');

    var tracerouteOut = '';

    var promise = new Promise(function(resolve) {
        traceroute.stdout.on('data', function(data) {
           tracerouteOut += data;
        });

        traceroute.on('close', function() {
            tracerouteOut = tracerouteOut.trim();   // Remove last newline to blank line.

            var hops = tracerouteOut.split("\n");
            hops = hops.splice(1, hops.length - 1); // Remove starting traceroute header with the hostname.

            hops = formatHops(hops);

            resolve(hops);
        });
    });

    return promise;
}

function formatHops(hops) {
    hops = stripNonHops(hops);

    hops = hops.map(function(hop) {
        if(hop) {
            var line = hop.trim().split(' ');

            hop = {
                host: line[2],
                address: line[3].replace('(', '').replace(')', ''),
                averageResponse: (parseFloat(line[5]) + parseFloat(line[8]) + parseFloat(line[11])) / 3
            };
        }

        return hop;
    });

    return hops;
}

function stripNonHops(hops) {
    hops = hops.map(function(hop) {
        if(hop.includes('* * *')) {
            hop = null;
        }

        return hop;
    });

    hops.reverse();

    // Leave null hops in between responding hops.
    var nonNullReached = false;

    var strippedHops = [];

    hops.forEach(function(hop) {
        if(hop || nonNullReached) {
            nonNullReached = true;
            strippedHops.push(hop);
        }
    });

    strippedHops.reverse();

    return strippedHops;
}

function getBandwithUtilization() {

    var promise = new Promise(function(resolve, reject) {
        shell.spawn('ifstat', ['-a', '-n', '-b', '-q', '1', '1']).then(function(out) {
            resolve(parseIfstat(out));
        }, function() {
            reject();
        });
    });

    return promise;
}

function parseIfstat(stdout) {
    var lines = stdout.toString().split(/\n/g);
    var interfaceNames = lines[0].match(/\S+/g);
    var bandwidthNumbers = lines[2].match(/\S+/g);

    var bandwidthData = { };

    interfaceNames.forEach(function(name, i) {
        bandwidthData[name] = { };
        bandwidthData[name].in = parseFloat(bandwidthNumbers[i * 2]);
        bandwidthData[name].out = parseFloat(bandwidthNumbers[i * 2 + 1]);
    });

    return bandwidthData;
}
