(function() {
    'use strict';

    angular.module('BlurMonitor.pages.processor').controller('ProcessorController', ProcessorController);

        function ProcessorController($scope, $interval, refreshInterval, ProcessorResource, ProcessResource, bootstrapFactory) {
            var vm = this;

            vm.interval = null;

            vm.processors = [];
            vm.processes = [];

            vm.processorStats = [];
            vm.processorStatsColumns = [];

            registerInterval();

            function registerInterval() {
                loadProcessors();
                loadProcesses();

                vm.interval = $interval(function() {
                    loadProcessors();
                    loadProcesses();
                }, refreshInterval);

                $scope.$on("$destroy", function() {
                    $interval.cancel(vm.interval);
                });
            }

            function loadProcessors() {
                ProcessorResource.query(function(processors) {
                    vm.processors = processors;

                    angular.forEach(processors, function(processor, i) {
                        processor.index = i;
                        vm.processorStats[i] = processor;
                    });

                    bootstrapFactory.splitCollectionForColumns(vm.processorStats, vm.processorStatsColumns, 4);
                });
            }

            function loadProcesses() {
                ProcessResource.query(function(processes) {
                    vm.processes = processes;
                });
            }
        }
})();