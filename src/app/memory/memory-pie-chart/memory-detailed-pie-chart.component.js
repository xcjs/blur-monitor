(function() {
    'use strict';

    angular.module('BlurMonitor.memory').component('memoryDetailedPieChart', {
        templateUrl: 'app/memory/memory-pie-chart/memory-pie-chart.html',
        controller: 'MemoryDetailedPieChartController',
        controllerAs: 'vm',
        bindings: {
            memory: '<'
        }
    });
})();