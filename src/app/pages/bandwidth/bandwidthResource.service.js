(function() {
    'use strict';

    angular.module('BlurMonitor.pages.bandwidth').service('BandwidthResource',
        ['$resource', BandwidthResource]);

    function BandwidthResource($resource) {
        var Disks = $resource('/api/bandwidth');

        this.get = Disks.get;
    }
})();