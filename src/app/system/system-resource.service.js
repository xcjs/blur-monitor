(function() {
    'use strict';

    angular.module('BlurMonitor.system').service('SystemResource', SystemResource);

    function SystemResource($resource) {
        var system = $resource('/api/system');

        this.get = system.get;
    }
})();
