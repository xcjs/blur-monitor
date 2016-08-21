(function () {
    'use strict';

    angular.module('BlurMonitor.config')
        .constant('moment', window.moment)
        .constant('_', window._)
        // The time interval to call the various services in milliseconds.
        .constant('refreshInterval', 1000)
        .constant('maxSnapshots', 20)
        .constant('processorPercentageThreshold', 1);
})();