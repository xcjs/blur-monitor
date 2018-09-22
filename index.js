/*jslint node: true */
/*jslint esversion: 6 */

'use strict';

process.chdir(__dirname);
console.info('Using ' + process.cwd() + ' as the present working directory...');

var Hapi = require('hapi');
var Inert = require('inert');
var AuthBearer = require('hapi-auth-bearer-token');
var authProvider = require('./server/services/auth/pam-auth-provider');

var env = require('./server/util/environment');

console.info('Using ' + env.current + ' as the current environment...');

var server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: __dirname
            }
        }
    }
});

server.connection({
    port: env.port
});

server.register(Inert);

server.register(AuthBearer, function(error) {
    server.auth.strategy('pamToken', 'bearer-access-token', {
        validateFunc: function (token, cb) {
            authProvider.getTokenValue(token).then(function () {
                return cb(null, true, { token: token });
            }, function () {
                if (error) {
                    console.error('Authentication failed.');
                } else {
                    console.error('Authentication failed with an error: ' + error);
                }

                return cb(null, false, { token: token });
            });
        }
    });
});

var routers = [
    require('./server/routes/static'),
    require('./server/routes/auth'),
    require('./server/routes/system'),
    require('./server/routes/processor'),
    require('./server/routes/memory'),
    require('./server/routes/disks'),
    require('./server/routes/network'),
    require('./server/routes/processes'),
    require('./server/routes/bandwidth'),
    require('./server/routes/assets')
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
