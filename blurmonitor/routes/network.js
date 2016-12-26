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
        handler: function (request, reply) {
            return reply(getInterfaces());
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

    routes.push({
        method: 'GET',
        path: '/api/network/traceroute',
        handler: function(request, reply) {
            var origin = request.headers['x-forwarded-for'] || request.info.remoteAddress;

            return reply(getTraceRoute(origin.trim()));
        }
    });

    return routes;
}

function getInterfaces() {
    var response = { };
    response.bandwidth = { };
    response.interfaces = os.networkInterfaces();

    var promise = new Promise(function(resolve, reject) {
        getBandwithUtilization().then(function(bandwidthString) {
            response.bandwidth = parseIfstat(bandwidthString);
            resolve(response);
        }), function() {
            reject(response);
        };
    });

    return promise;
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

            resolve({ traceroute: hops });
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
    return shell.spawn('ifstat', ['-a', '-n', '-b', '-q', '1', '1']);
}

function parseIfstat(stdout) {
    var lines = stdout.toString().split(/\n/g);
    var interfaceNames = lines[0].match(/\S+/g);
    var bandwidthNumbers = lines[2].match(/\S+/g);

    var bandwidthData = { };

    interfaceNames.forEach(function(name, i) {
        bandwidthData[name] = { };
        bandwidthData[name].in = bandwidthNumbers[i * 2];
        bandwidthData[name].out = bandwidthNumbers[i * 2 + 1];
    });

    return bandwidthData;
}
