/*jslint node: true */

'use strict';

module.exports = getRoutes();

function getRoutes() {
    var routes = [];

    routes.push({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: ['./.tmp/serve/', './src/'],
                redirectToSlash: true,
                index: true
            }
        }
    });

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

    return routes;
}
