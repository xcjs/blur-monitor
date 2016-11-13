(function() {
    'use strict';

    angular.module('BlurMonitor.processor').component('processorStats', {
        templateUrl: 'app/processor/processor-stats/processor-stats.html',
        controller: 'ProcessorStatsController',
        controllerAs: 'vm',
        bindings: {
            processor: '<'
        }
    });
})();
