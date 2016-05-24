/*jslint node: true */

'use strict';

var diskInfo = require('nodejs-disks');

module.exports = getRoutes();

function getRoutes() {
    var routes = [];

    routes.push({
        method: 'GET',
        path: '/api/disks',
        handler: function (request, reply) {
            return reply(getDisks());
        }
    });

    routes.push({
        method: 'GET',
        path: '/api/disks/{id}',
        handler: function (request, reply) {
            return reply(getDisk(request.params.id));
        }
    });

    return routes;
}

function getDisks() {
    var promise = new Promise(function (resolve) {
        diskInfo.drives(
            function (err, drives) {
                diskInfo.drivesDetail(drives,
                    function (err, data) {
                        var i = 0;

                        data.forEach(function(item) {
                            item.id = i;
                            i++;
                        });

                        resolve(data);
                    }
                )
            }
        );
    });

    return promise;
}

function getDisk(id) {
    var promise = new Promise(function (resolve) {
        diskInfo.drives(
            function (err, drives) {
                diskInfo.drivesDetail(drives,
                    function (err, data) {
                        data[id].id = id;
                        resolve(data[id]);
                    }
                )
            }
        );
    });

    return promise;
}
