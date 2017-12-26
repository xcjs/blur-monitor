(function() {
    'use strict';

    angular.module('BlurMonitor.pages.memory').controller('MemoryController', MemoryController);

    function MemoryController($scope, $interval, refreshInterval, MemoryResource, ProcessResource) {
        var vm = this;

        vm.memory = {};

        registerInterval();

        function registerInterval() {
            loadMemory();
            loadProcesses();

            vm.interval = $interval(function() {
                loadMemory();
                loadProcesses();

            }, refreshInterval);

            $scope.$on('$destroy', function() {
                $interval.cancel(vm.interval);
            });
        }

        function loadMemory() {
            MemoryResource.get(function(memory) {
                vm.memory = memory;

                if(!vm.memory.swap) {
                    vm.memory.swap = null;
                }
            });
        }

        function loadProcesses() {
            ProcessResource.query(function(processes) {
                vm.processes = processes;
            });
        }
    }
})();
