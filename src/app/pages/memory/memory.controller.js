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

        vm.chartData = [];
        vm.chartLabels = [];
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
                    total: convertToMb(memory.total),
                    actualUsed: convertToMb(memory.actualUsed),
                    actualFree: convertToMb(memory.actualFree),
                    free: convertToMb(memory.free),
                    used: convertToMb(memory.used),
                    cached: convertToMb(memory.cached),
                    buffers: convertToMb(memory.buffers),
                    shared: convertToMb(memory.shared)
                };

                var perUsed = (vm.memory.actualUsed / vm.memory.total * 100).toFixed(2);
                var perFree = (vm.memory.actualFree / vm.memory.total * 100).toFixed(2);

                vm.chartData[0] = vm.memory.actualUsed;
                vm.chartLabels[0] = 'Used: ' + vm.memory.actualUsed + ' MB ' + '(' + perUsed + '%)';

                vm.chartData[1] = vm.memory.actualFree;
                vm.chartLabels[1] = 'Free: ' + vm.memory.actualFree + ' MB ' + '(' + perFree + '%)';
            });
        }

        function convertToMb(value) {
            return (value / (1024)).toFixed(2);
        }
    }
})();