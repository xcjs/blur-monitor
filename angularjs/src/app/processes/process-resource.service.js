(function() {
    'use strict';

    angular.module('BlurMonitor.processes').service('ProcessResource', ProcessResource);

    function ProcessResource($resource) {
        var Process = $resource('/api/processes');

        this.query = Process.query;
    }
})();