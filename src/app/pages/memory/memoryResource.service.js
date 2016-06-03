(function() {
    'use strict';

    angular.module('BlurMonitor.pages.memory').service('MemoryResource',
        ['$resource', MemoryResource]);

    function MemoryResource($resource) {
        var Memory = $resource('/api/memory');

        this.query = Memory.query;
    }
})();