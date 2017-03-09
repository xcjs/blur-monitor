/*jslint node: true */
/*jslint esversion: 6 */

'use strict';

var Hapi = require('hapi');
var Inert = require('inert');
var path = require('path');
var AuthBearer = require('hapi-auth-bearer-token');
var authProvider = require('./services/auth/pam-auth-provider');

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

server.register(AuthBearer, function(err) {
    server.auth.strategy('simple', 'bearer-access-token', {
        validateFunc: function (token, cb) {
            authProvider.get(token).then(function () {
                return cb(null, true, {token: token});
            }, function () {
                return cb(null, false, {token: token});
            });
        }
    });
});

var routers = [
    require('./routes/static'),
    require('./routes/auth'),
    require('./routes/system'),
    require('./routes/processor'),
    require('./routes/memory'),
    require('./routes/disks'),
    require('./routes/network'),
    require('./routes/processes'),
    require('./routes/bandwidth'),
    require('./routes/assets')
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
