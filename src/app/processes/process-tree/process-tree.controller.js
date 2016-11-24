(function() {
    'use strict';

    angular.module('BlurMonitor.processes').controller('ProcessTreeController', ProcessTreeController);

    function ProcessTreeController(ProcessResource) {
        var vm = this;

        vm.processes = vm.processess || [];
        vm.icons = vm.icons || [];
        vm.searchTerm = vm.searchTerm || null;

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

        vm.loadProcesses = loadProcesses;
        vm.filterProcesses = filterProcesses;

        vm.$doCheck = function() {
            if(vm.processes
                && vm.processes.length > 0
                && vm.icons
                && vm.icons.length > 0
            ) {
                mapIconsToTreeTypes(vm.icons);
                mapProcessesToTree(vm.processes);
                vm.$doCheck = function() { };
            }
        };

        function mapIconsToTreeTypes(icons) {
            angular.forEach(icons, function(iconName) {
                vm.treeConfig.types[iconName] = {};
                vm.treeConfig.types[iconName].icon = '/assets/img/app/apps/' + iconName + '.svg';
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
                    parent: parentId,
                    type: getIconName(process.command),
                    text: process.command + ' (' + process.processorUtilization + '%), (' + process.memoryUtilization + '%)',
                    state: {
                        opened: process.parentId === '0'
                    }
                };

                vm.treeProcesses.push(node);
            });

            vm.treeConfig.version++;
        }

        function getIconName(command) {
            if (command.indexOf(' ') > -1) {
                command = command.substr(0, command.indexOf(' '));
            }

            if (command.indexOf('/') > -1 && command.indexOf('[') === -1) {
                command = command.substr(command.lastIndexOf('/') + 1, command.length - command.lastIndexOf('/'));
            }

            if (!vm.icons.includes(command)) {
                command = 'process';
            }

            return command;
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

        function loadProcesses() {
            ProcessResource.query(function(processes) {
                vm.processes = processes;
                mapProcessesToTree(processes);
                vm.searchTerm = null;
            });
        }
    }
})();