(function() {
    'use strict';

    angular.module('BlurMonitor.memory').component('memoryActivePieChart', {
        templateUrl: 'app/memory/memory-pie-chart/memory-pie-chart.html',
        controller: 'MemoryActivePieChartController',
        controllerAs: 'vm',
        bindings: {
            memory: '<'
        }
    });
})();