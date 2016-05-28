(function () {
    'use strict';

    angular.module('BlurMonitor.constants', [])
        // The time interval to call the various services in milliseconds.
        .constant('refreshInterval', 1000)
        .constant('maxSnapshots', 20);
})();