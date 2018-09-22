/*jslint node: true */

'use strict';

var psjson = require('psjson');
var DataTransform = require("node-json-transform").DataTransform;

module.exports = getRoutes();

function getRoutes() {
    var routes = [];

    routes.push({
        method: 'GET',
        path: '/api/processes',
        config: {
            auth: 'pamToken',
            handler: function (request, reply) {
                return reply(getAllProcesses());
            }
        }
    });

    routes.push({
        method: 'GET',
        path: '/api/processes/{id}',
        config: {
            auth: 'pamToken',
            handler: function(request, reply) {
                return reply(getProcessById(request.params.id));
            }
        }
    });

    return routes;
}

function getAllProcesses() {
    var promise = new Promise(function(resolve) {
        psjson.ps('ps -e -o user:64,pid,ppid,%cpu,%mem,command', function(err, json) {
            resolve(transformProcessResponse(json));
        });
    });

    return promise;
}

function transformProcessResponse(json) {
    var map = {
        list: 'rows',
        item: {
            id: 'PID',
            parentId: 'PPID',
            user: 'USER',
            processorUtilization: '%CPU',
            memoryUtilization: '%MEM',
            command: 'COMMAND'
        }
    };

    var dataTransform = DataTransform(json, map);

    return dataTransform.transform();
}

function getProcessById(pid) {
    var promise = new Promise(function(resolve) {
        psjson.ps('ps --pid ' + pid + ' -o user:64,pid,ppid,%cpu,%mem,command', function(err, json) {
            resolve(transformProcessResponse(json));
        });
    });

    return promise;
}
