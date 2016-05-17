/*jslint node: true */
/*jslint esversion: 6 */

'use strict';

var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({
    port: 3000
});

var routers = [
    require('./routes/processor')
];

routers.forEach(function (router) {
    router.forEach(function (route) {
        server.route(route);
    });
});

server.start((err) => {
    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});
