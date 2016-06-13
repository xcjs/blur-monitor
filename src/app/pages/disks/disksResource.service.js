(function() {
    'use strict';

    angular.module('BlurMonitor.pages.disks').service('DisksResource',
        ['$resource', DisksResource]);

    function DisksResource($resource) {
        var Disks = $resource('/api/disks');

        this.query = Disks.query;
    }
})();