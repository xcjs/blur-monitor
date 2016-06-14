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
            animation: false
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

                var used = convertToMb(memory.actualUsed);
                var free = convertToMb(memory.actualFree);

                vm.chartData[0] = used;
                vm.chartLabels[0] = 'Used: ' + used + ' MB';

                vm.chartData[1] = free;
                vm.chartLabels[1] = 'Free: ' + free + ' MB';
            });
        }

        function convertToMb(value) {
            return (value / (1024)).toFixed(2);
        }
    }
})();