(function() {
    'use strict';

    angular.module('BlurMonitor.pages.bandwidth').service('BandwidthResource',
        ['$resource', DisksResource]);

    function DisksResource($resource) {
        var Disks = $resource('/api/bandwidth');

        this.get = Disks.get;
    }
})();