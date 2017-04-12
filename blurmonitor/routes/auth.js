/*jslint node: true */
/*jslint esversion: 6 */

'use strict';

var authProvider = require('../services/auth/pam-auth-provider');

module.exports = getRoutes();

function getRoutes() {
    var routes = [];

    routes.push({
        method: 'POST',
        path: '/api/auth',
        handler: function(request, reply) {
            var username = request.payload.username;
            var password = request.payload.password;

            var promise = authProvider.authenticate(username, password).then(function(token) {
                var response = request.generateResponse();
                response.headers.Authorization = 'Bearer ' + token;
                response.payload = null;

                return reply(response);
            }, function(err) {
                var response = request.generateResponse({ error: err }).code(401);

                return reply(response);
            });

            return promise;
        }
    });

    return routes;
}
