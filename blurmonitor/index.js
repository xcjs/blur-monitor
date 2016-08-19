/*jslint node: true */
/*jslint esversion: 6 */

'use strict';

var Hapi = require('hapi');
var Inert = require('inert');
var path = require('path');

var env = require('./util/environment');

var server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, '../')
            }
        }
    }
});

server.connection({
    port: env.port
});

server.register(Inert);

var routers = [
    require('./routes/static'),
    require('./routes/system'),
    require('./routes/processor'),
    require('./routes/memory'),
    require('./routes/disks'),
    require('./routes/network'),
    require('./routes/processes'),
    require('./routes/bandwidth')
];

routers.forEach(function (router) {
    router.forEach(function (route) {
        server.route(route);
    });
});

server.start(function(err) {
    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});
