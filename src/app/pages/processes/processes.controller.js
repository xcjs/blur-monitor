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
                worker: false
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

        vm.interval = $interval(function() {
            getProcesses();
        }, refreshInterval * 10);

        $scope.$on('$destroy', function() {
            $interval.cancel(vm.interval);
        });

        function getProcesses() {
            ProcessesResource.query().$promise.then(function(response) {
                vm.processes = response;
                mapProcesses(vm.processes);
            });
        }

        function mapProcesses(processes) {
            vm.treeProcesses.length = 0;

            angular.forEach(processes, function(process) {
                var node = {
                    id: process.id,
                    parent: process.parentId !== '0' ? process.parentId : '#',
                    type: 'process',
                    text: process.command + ' (' + process.processorUtilization + '%), (' + process.memoryUtilization + '%)',
                    state: {
                        opened: true
                    }
                };

                vm.treeProcesses.push(node);
            });
        }
    }
})();