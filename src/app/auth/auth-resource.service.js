(function() {
    'use strict';

    angular.module('BlurMonitor.auth').service('AuthResource', AuthResource);

    function AuthResource($resource) {
        var auth = $resource('/api/auth');

        this.authenticate = auth.save;
    }
})();