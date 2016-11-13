(function() {
    'use strict';

    angular.module('BlurMonitor.pages.memory').controller('MemoryController', MemoryController);

    function MemoryController($scope, $interval, refreshInterval, MemoryResource) {
        var vm = this;

        vm.memory = {};

        registerInterval();

        function registerInterval() {
            loadMemory();
            vm.interval = $interval(function() {
                loadMemory();
            }, refreshInterval);

            $scope.$on('$destroy', function() {
                $interval.cancel(vm.interval);
            });
        }

        function loadMemory() {
            MemoryResource.get(function(memory) {
                vm.memory = memory;
            });
        }
    }
})();