(function() {
    'use strict';

    angular.module('BlurMonitor.pages.processor').controller('ProcessorController', ProcessorController);

        function ProcessorController($scope, $interval, refreshInterval, ProcessorResource, bootstrapFactory) {
            var vm = this;

            vm.interval = null;

            vm.processors = [];

            vm.processorStats = [];
            vm.processorStatsColumns = [];

            registerInterval();

            function registerInterval() {
                loadProcessors();
                vm.interval = $interval(function() {
                    loadProcessors();
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
        }
})();