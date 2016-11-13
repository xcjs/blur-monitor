(function() {
    'use strict';

    angular.module('BlurMonitor.memory').component('memorySwapPieChart', {
        templateUrl: 'app/memory/memory-pie-chart/memory-pie-chart.html',
        controller: 'MemorySwapPieChartController',
        controllerAs: 'vm',
        bindings: {
            memory: '<'
        }
    });
})();