(function() {
    'use strict';

    angular.module('BlurMonitor.pages.processes').controller('ProcessesController', [
        '$scope',
        '$interval',
        '_',
        'refreshInterval',
        'ProcessesResource',
        'AssetsResource',
        ProcessesController]);

    function ProcessesController($scope, $interval, _, refreshInterval, ProcessesResource, AssetsResource) {
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

        vm.topCpuProcesses = [];
        vm.topMemoryProcesses = [];

        vm.processAssets = [];

        vm.searchTerm = null;

        vm.getProcesses = getProcesses;
        vm.filterProcesses = filterProcesses;

        AssetsResource.getApps(function(appAssets) {
            vm.processAssets = appAssets;

            angular.forEach(appAssets, function(appAsset) {
                vm.treeConfig.types[appAsset] = {};
                vm.treeConfig.types[appAsset].icon = '/assets/img/app/apps/' + appAsset + '.svg';
            });

            getProcesses(false);
            getProcesses(true);

            vm.interval = $interval(function() {
                getProcesses(false);
            }, refreshInterval);
        });

        $scope.$on("$destroy", function() {
            $interval.cancel(vm.interval);
        });

        function getProcesses(updateTree) {
            ProcessesResource.query().$promise.then(function(response) {
                vm.processes = response;

                if(updateTree) {
                    vm.searchTerm = null;
                    mapProcessesToTree(vm.processes);
                } else {
                    // Update top lists instead.
                    getTopCpuProcesses();
                    getTopMemoryProcesses();
                }
            });
        }

        function getTopCpuProcesses() {
            vm.topCpuProcesses = vm.processes.filter(function(process) {
                if(parseFloat(process.processorUtilization) > 0) {
                    return process;
                }
            });

            vm.topCpuProcesses.sort(function(a, b) {
                return b.processorUtilization - a.processorUtilization;
            });

            angular.forEach(vm.topCpuProcesses, function(process) {
                var iconName = getTreeTypeFromCommand(process.command);

                process.displayName = process.command;
                process.icon = '/assets/img/app/apps/' + iconName + '.svg';
                process.iconFont = iconName === 'process';
            });
        }

        function getTopMemoryProcesses() {
            vm.topMemoryProcesses = vm.processes.filter(function(process) {
                if(parseFloat(process.memoryUtilization) > 0) {
                    return process;
                }
            });

            vm.topMemoryProcesses.sort(function(a, b) {
                return b.memoryUtilization - a.memoryUtilization;
            });

            angular.forEach(vm.topMemoryProcesses, function(process) {
                var iconName = getTreeTypeFromCommand(process.command);

                process.displayName = process.command;
                process.icon = '/assets/img/app/apps/' + iconName + '.svg';
                process.iconFont = iconName === 'process';
            });
        }

        function mapProcessesToTree(processes) {
            vm.treeProcesses.length = 0;

            angular.forEach(processes, function(process) {
                var parentId = '#';

                if(_.find(processes, {id: process.parentId})) {
                    parentId = process.parentId;
                }

                var node = {
                    id: process.id,
                    parent: parentId, // process.parentId !== '0' ? process.parentId : '#',
                    type: getTreeTypeFromCommand(process.command),
                    text: process.command + ' (' + process.processorUtilization + '%), (' + process.memoryUtilization + '%)',
                    state: {
                        opened: process.parentId === '0'
                    }
                };

                vm.treeProcesses.push(node);
            });

            vm.treeConfig.version++;
        }

        function getTreeTypeFromCommand(command) {
            var process = command;

            if (process.indexOf(' ') > -1) {
                process = command.substr(0, command.indexOf(' '));
            }

            if (process.indexOf('/') > -1 && process.indexOf('[') === -1) {
                process = process.substr(process.lastIndexOf('/') + 1, process.length - process.lastIndexOf('/'));
            }

            if (!vm.processAssets.includes(process)) {
                process = 'process';
            }

            return process;
        }

        function filterProcesses() {
            if(vm.searchTerm !== null && vm.searchTerm.length > 0) {
                var filteredProcesses = vm.processes.filter(function (process) {
                    return process.command.indexOf(vm.searchTerm) > -1;
                });

                mapProcessesToTree(filteredProcesses);
            } else {
                mapProcessesToTree(vm.processes);
            }
        }
    }
})();