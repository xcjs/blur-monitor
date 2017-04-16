(function() {
   'use strict';

    angular.module('BlurMonitor.auth').factory('authInterceptor', authInterceptor);

    function authInterceptor(AuthStorage) {
        var interceptor = {
            request: function(config) {
                var token = AuthStorage.get();

                if(token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }

                return config;
            },
            response: function(response) {
                var authorization = response.headers('Authorization');

                if(authorization && authorization.indexOf(' ') > -1) {
                    AuthStorage.set(authorization.split(' ')[1]);
                }

                return response;
            }
        };

        return interceptor;
    }
})();