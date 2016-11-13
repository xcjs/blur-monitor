(function() {
    'use strict';

    angular.module('BlurMonitor.processor').component('processorLineChart', {
        templateUrl: 'app/processor/processor-line-chart/processor-line-chart.html',
        controller: 'ProcessorLineChartController',
        controllerAs: 'vm',
        bindings: {
            processors: '<'
        }
    });
})();
