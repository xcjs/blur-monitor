(function() {
    'use strict';

    angular.module('BlurMonitor.auth').service('AuthStorage', AuthStorage);

    function AuthStorage(localStorageService) {

        this.get = get;
        this.set = set;

        var key = 'blur-monitor-token';

        function get() {
            return localStorageService.get(key);
        }

        function set(token) {
            return localStorageService.set(key, token);
        }
    }
})();