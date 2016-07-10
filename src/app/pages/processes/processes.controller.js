(function() {
    'use strict';

    angular.module('BlurMonitor.pages.processes').controller('ProcessesController', [
        '$scope',
        '$interval',
        'refreshInterval',
        'ProcessesResource',
        ProcessesController]);

    function ProcessesController($scope, $interval, refreshInterval, ProcessesResource) {
        var vm = this;
        vm.processes = [];

        vm.treeConfig = {
            core: {
                multiple: false,
                worker: true
            },
            types: {
                process: {
                    icon: 'ion-gear-a'
                }
            },
            plugins: ['types'],
            version: 1
        };

        vm.treeProcesses = [];

        vm.topCpuProcesses = [];
        vm.topMemoryProcesses = [];

        vm.getProcesses = getProcesses;

        getProcesses(true);

        vm.interval = $interval(function() {
            getProcesses(false);
        }, refreshInterval);

        $scope.$on("$destroy", function() {
            $interval.cancel(vm.interval);
        });

        function getProcesses(updateTree) {
            ProcessesResource.query().$promise.then(function(response) {
                vm.processes = response;

                if(updateTree) {
                    mapProcessesToTree(vm.processes);
                } else {
                    // Update top lists instead.
                    getTopCpuProcesses();
                    getTopMemoryProcesses();
                }
            });
        }

        function getTopCpuProcesses() {
            var processes = angular.copy(vm.processes);

            processes.sort(function(a, b) {
                return b.processorUtilization - a.processorUtilization;
            });

            vm.topCpuProcesses = processes.slice(0, 10);

            angular.forEach(vm.topCpuProcesses, function(process) {
                process.displayName = process.command.length <= 50 ? process.command : process.command.substring(0, 50) + '...'
            });
        }

        function getTopMemoryProcesses() {
            var processes = angular.copy(vm.processes);

            processes.sort(function(a, b) {
                return b.memoryUtilization - a.memoryUtilization;
            });

            vm.topMemoryProcesses = processes.slice(0, 10);

            angular.forEach(vm.topMemoryProcesses, function(process) {
                process.displayName = process.command.length <= 50 ? process.command : process.command.substring(0, 50) + '...'
            });
        }

        function mapProcessesToTree(processes) {
            vm.treeProcesses.length = 0;

            angular.forEach(processes, function(process) {
                var node = {
                    id: process.id,
                    parent: process.parentId !== '0' ? process.parentId : '#',
                    type: 'process',
                    text: process.command + ' (' + process.processorUtilization + '%), (' + process.memoryUtilization + '%)',
                    state: {
                        opened: process.parentId === '0'
                    }
                };

                vm.treeProcesses.push(node);
            });

            vm.treeConfig.version++;
        }
    }
})();