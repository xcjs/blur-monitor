/*jslint node: true */

'use strict';

var diskInfo = require('nodejs-disks');
var _ = require('lodash/array');

module.exports = getRoutes();

function getRoutes() {
    var routes = [];

    routes.push({
        method: 'GET',
        path: '/api/disks',
        config: {
            auth: 'pamToken',
            handler: function (request, reply) {
                return reply(getDisks());
            }
        }
    });

    routes.push({
        method: 'GET',
        path: '/api/disks/{id}',
        config: {
            auth: 'pamToken',
            handler: function (request, reply) {
                return reply(getDisk(request.params.id));
            }
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

                        var uniqueDrives = _.uniq(data, 'mountpoint');

                        uniqueDrives.forEach(function(item) {
                            item.id = i;
                            i++;
                        });

                        resolve(uniqueDrives);
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
                        var uniqueDrives = _.uniq(data, 'mountpoint');

                        uniqueDrives[id].id = id;
                        resolve(uniqueDrives[id]);
                    }
                )
            }
        );
    });

    return promise;
}
