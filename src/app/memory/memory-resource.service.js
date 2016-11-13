(function() {
    'use strict';

    angular.module('BlurMonitor.memory').service('MemoryResource', MemoryResource);

    function MemoryResource($resource) {
        var memory = $resource('/api/memory');

        this.get = memory.get;
    }
})();