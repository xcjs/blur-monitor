(function() {
   'use strict';

    angular.module('BlurMonitor.auth').factory('authInterceptor', authInterceptor);

    function authInterceptor(AuthStorage) {
        var interceptor = {
            request: function(config) {
                var token = AuthStorage.get();

                if(token) {

                }

                return config;
            },
            response: function(response) {

                return response;
            }
        };

        return interceptor;
    }
})();