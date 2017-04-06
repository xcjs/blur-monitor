(function() {
   'use strict';

    angular.module('BlurMonitor.auth').factory('authInterceptor', authInterceptor);

    function authInterceptor(AuthStorage) {
        var interceptor = {
            request: function(config) {
                var token = AuthStorage.get();

                if(token) {

                }

                console.log(config);

                return config;
            },
            response: function(response) {
                console.log(response);

                return response;
            }
        };

        return interceptor;
    }
})();