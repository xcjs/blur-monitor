/*jslint node: true */

'use strict';

const path = require('path');

const env = require('../util/environment');

module.exports = getRoutes();

function getRoutes() {
    var routes = [];

    var handlerPaths = [];

    if (Array.isArray(env.staticRoot)) {
        env.staticRoot.forEach(function (dir) {
            handlerPaths.push(path.join(__dirname, '../../' + dir));
        });
    } else {
        handlerPaths.push(path.join(__dirname, '../../' + env.staticRoot));
    }

    routes.push({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: handlerPaths,
                redirectToSlash: true,
                index: true
            }
        }
    });

    return routes;
}
