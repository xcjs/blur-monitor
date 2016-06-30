(function() {
    'use strict';

    angular.module('BlurMonitor.pages.memory').controller('MemoryController', [
        '$scope',
        '$interval',
        'refreshInterval',
        'MemoryResource',
        MemoryController]);

    function MemoryController($scope, $interval, refreshInterval, MemoryResource) {
        var vm = this;

        vm.memory = {};

        vm.activeChartData = [];
        vm.activeChartLabels = [];

        vm.detailedChartData = [];
        vm.detailedChartLabels = [];

        vm.sharedChartData = [];
        vm.sharedChartLabels = [];
        
        vm.swapChartData = [];
        vm.swapChartLabels = [];

        vm.chartOptions = {
            animation: false,
            showTooltips: false
        };

        vm.interval = $interval(function() {
            getMemory();
        }, refreshInterval);

        $scope.$on('$destroy', function() {
            $interval.cancel(vm.interval);
        });

        function getMemory() {
            MemoryResource.get(function(memory) {
                vm.memory = {
                    total: convertToMB(memory.total),
                    actualUsed: convertToMB(memory.actualUsed),
                    actualFree: convertToMB(memory.actualFree),
                    free: convertToMB(memory.free),
                    used: convertToMB(memory.used),
                    cached: convertToMB(memory.cached),
                    buffers: convertToMB(memory.buffers),
                    shared: convertToMB(memory.shared),
                    swapTotal: convertToMB(memory.swapTotal),
                    swapUsed: convertToMB(memory.swapUsed),
                    swapFree: convertToMB(memory.swapFree)
                };

                // Active Memory Utilization

                vm.activeChartData[0] = vm.memory.actualUsed;
                vm.activeChartLabels[0] = buildChartLabel('Used', vm.memory.actualUsed);

                vm.activeChartData[1] = vm.memory.actualFree;
                vm.activeChartLabels[1] = buildChartLabel('Free', vm.memory.actualFree);

                // Detailed Memory Utilization

                vm.detailedChartData[0] = vm.activeChartData[0];
                vm.detailedChartLabels[0] = 'Active ' + vm.activeChartLabels[0];

                vm.detailedChartData[1] = vm.memory.cached;
                vm.detailedChartLabels[1] = buildChartLabel('Cached', vm.memory.cached);

                vm.detailedChartData[2] = vm.memory.buffers;
                vm.detailedChartLabels[2] = buildChartLabel('Buffers', vm.memory.buffers);

                vm.detailedChartData[3] = vm.memory.free;
                vm.detailedChartLabels[3] = buildChartLabel('Free', vm.memory.free);

                // Shared Memory

                vm.sharedChartData[0] = vm.memory.shared;
                vm.sharedChartLabels[0] = buildChartLabel('Shared', vm.memory.shared, calcUsedMemPercent);

                vm.sharedChartData[1] = (vm.memory.used - vm.memory.shared).toFixed(2);
                vm.sharedChartLabels[1] = buildChartLabel('Isolated', (vm.memory.used - vm.memory.shared).toFixed(2), calcUsedMemPercent);

                vm.sharedChartData[2] = vm.memory.free;
                vm.sharedChartLabels[2] = buildChartLabel('Free', vm.memory.free);

                // Swap

                vm.swapChartData[0] = vm.memory.swapUsed;
                vm.swapChartLabels[0] = buildChartLabel('Used', vm.memory.swapUsed, calcSwapPercent);

                vm.swapChartData[1] = vm.memory.swapFree;
                vm.swapChartLabels[1] = buildChartLabel('Free', vm.memory.swapFree, calcSwapPercent);
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

        function calcUsedMemPercent(part) {
            return (part / vm.memory.used * 100).toFixed(2);
        }

        function calcSwapPercent(part) {
            return (part / vm.memory.swapTotal * 100).toFixed(2);
        }

        function convertToMB(kB) {
            return (kB / 1024).toFixed(2);
        }
    }
})();