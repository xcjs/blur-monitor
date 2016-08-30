(function() {
    'use strict';

    angular.module('BlurMonitor.pages.memory').controller('MemoryController', [
        '$scope',
        '$interval',
        'refreshInterval',
        'MemoryResource',
        'memoryPercentageThreshold',
        MemoryController]);

    function MemoryController($scope, $interval, refreshInterval, MemoryResource, memoryPercentageThreshold) {
        var vm = this;

        vm.memory = {};
        vm.memoryPercentageThreshold = memoryPercentageThreshold;

        vm.activeChartData = [];
        vm.activeChartLabels = [];

        vm.usedMemoryPercent = 0;

        vm.detailedChartData = [];
        vm.detailedChartLabels = [];

        vm.sharedChartData = [];
        vm.sharedChartLabels = [];
        
        vm.swapChartData = [];
        vm.swapChartLabels = [];

        vm.usedSwapPercent = 0;

        vm.chartOptions = {
            animation: false,
            showTooltips: false
        };

        getMemory();
        vm.interval = $interval(function() {
            getMemory();
        }, refreshInterval);

        $scope.$on('$destroy', function() {
            $interval.cancel(vm.interval);
        });

        function getMemory() {
            MemoryResource.get(function(memory) {
                // Active Memory Utilization
                vm.memory = memory;

                vm.activeChartData[0] = vm.memory.used;
                vm.activeChartLabels[0] = buildChartLabel('Used', vm.memory.used);

                vm.usedMemoryPercent = calcTotalMemPercent(vm.memory.used);

                vm.activeChartData[1] = (vm.memory.total - vm.memory.used).toFixed(0);
                vm.activeChartLabels[1] = buildChartLabel('Available', vm.activeChartData[1]);

                // Detailed Memory Utilization

                vm.detailedChartData[0] = (vm.memory.used - vm.memory.shared).toFixed(0);
                vm.detailedChartLabels[0] = buildChartLabel('Used (Protected)', vm.detailedChartData[0]);

                vm.detailedChartData[1] = vm.memory.shared;
                vm.detailedChartLabels[1] = buildChartLabel('Used (Shared)', vm.memory.shared);

                vm.detailedChartData[2] = vm.memory.cache;
                vm.detailedChartLabels[2] = buildChartLabel('Cache/Buffers', vm.memory.cache);

                vm.detailedChartData[3] = vm.memory.free;
                vm.detailedChartLabels[3] = buildChartLabel('Free', vm.memory.free);

                // Swap

                vm.swapChartData[0] = vm.memory.swap.used;
                vm.swapChartLabels[0] = buildChartLabel('Used', vm.memory.swap.used, calcSwapPercent);

                vm.usedSwapPercent = calcSwapPercent(vm.swapChartData[0]);

                vm.swapChartData[1] = (vm.memory.swap.total - vm.memory.swap.used).toFixed(2);
                vm.swapChartLabels[1] = buildChartLabel('Free', vm.swapChartData[1], calcSwapPercent);
            });
        }

        function buildChartLabel(label, value, percentageFunction) {
            if(!percentageFunction) {
                percentageFunction = calcTotalMemPercent;
            }

            return label + ': ' + value + ' MB (' + percentageFunction(value)  + ')%';
        }

        function calcTotalMemPercent(part) {
            return (part / vm.memory.total * 100).toFixed(2);
        }

        function calcSwapPercent(part) {
            return (part / vm.memory.swap.total * 100).toFixed(2);
        }
    }
})();