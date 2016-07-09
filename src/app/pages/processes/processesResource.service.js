(function() {
    'use strict';

    angular.module('BlurMonitor.pages.processes').service('ProcessesResource',
        ['$resource', ProcessesResource]);

    function ProcessesResource($resource) {
        var Processes = $resource('/api/processes');

        this.query = Processes.query;
    }
})();