(function() {
    'use strict';

    angular.module('BlurMonitor.auth').service('AuthStorage', AuthStorage);

    function AuthStorage(localStorageService) {

        var key = 'blur-monitor-token';

        function get() {
            return localStorageService.get(key);
        }

        function set(token) {
            localStorageService.set(key, token);
        }
    }
})();