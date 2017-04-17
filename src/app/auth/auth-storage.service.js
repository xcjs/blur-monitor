(function() {
    'use strict';

    angular.module('BlurMonitor.auth').service('AuthStorage', AuthStorage);

    function AuthStorage(localStorageService) {

        this.get = get;
        this.set = set;
        this.remove = remove;

        var key = 'blur-monitor-token';

        function get() {
            return localStorageService.get(key);
        }

        function set(token) {
            return localStorageService.set(key, token);
        }

        function remove() {
            return localStorageService.removeItem(key);
        }
    }
})();