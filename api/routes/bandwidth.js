/*jslint node: true */

'use strict';

var randomstring = require('randomstring');
var Readable = require('stream').Readable;

module.exports = getRoutes();

function getRoutes() {
    var routes = [];

    routes.push({
        method: 'GET',
        path: '/api/bandwidth',
        handler: function (request, reply) {
            var payload = randomstring.generate(10000000); // ~10 MB

            var payloadStream = new Readable();
            payloadStream.push(payload);
            payloadStream.push(null);

            var payloadSize = Buffer.byteLength(payload, 'utf8');

            // Disable gzip compression in Hapi.
            request.info.acceptEncoding = false;

            return reply(payloadStream)
                .header('Content-Type', 'text/plain')
                .header('Cache-Control', 'no-cache')
                .encoding('utf8')
                .bytes(payloadSize);
        }
    });

    return routes;
}
