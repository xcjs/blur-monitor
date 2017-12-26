(function() {
    'use strict';

    angular.module('BlurMonitor.disks').service('DiskResource', DiskResource);

    function DiskResource($resource) {
        var disks = $resource('/api/disks');

        this.query = disks.query;
    }
})();