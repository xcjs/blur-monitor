/*jslint node: true */

'use strict';

var process = require('process');
var includes = require('array-includes');


module.exports = getRoutes();

function getRoutes() {
    var routes = [];
    var directoryPath;

    var dev = true;

    console.log(process.argv);

    if(includes(process.argv, 'serve:dist')) {
        dev = false;
    }

    if(dev) {
        directoryPath = ['./.tmp/serve/', './src/'];
    } else {
        directoryPath = './release/';
    }

    routes.push({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: directoryPath,
                redirectToSlash: true,
                index: true
            }
        }
    });

    if(dev) {
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
