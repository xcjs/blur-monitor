/*jslint node: true */

'use strict';

var env = require('../util/environment');

module.exports = getRoutes();

function getRoutes() {
    var routes = [];

    routes.push({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: env.staticRoot,
                redirectToSlash: true,
                index: true
            }
        }
    });

    // In development, provide mappings for Bower files not minified into the source.
    if(env.current === env.environments.dev) {
        routes.push({
            method: 'GET',
            path: '/bower_components/{param*}',
            handler: {
                directory: {
                    path: './bower_components',
                    redirectToSlash: true,
                    index: true
                }
            }
        });
    }

    return routes;
}
