(function() {
    'use strict';

    angular.module('BlurMonitor.processor').controller('ProcessorStatsController', ProcessorStatsController);

    function ProcessorStatsController(ProcessorUtilizationCalculator, processorPercentageThreshold) {
        var vm = this;

        vm.processorPercentageThreshold = processorPercentageThreshold;

        var previousSnapshot;

        vm.$doCheck = function() {
            updateUtilization();
        };

        function updateUtilization() {
            if(!angular.equals(previousSnapshot, vm.processor)) {
                vm.processor.utilization = ProcessorUtilizationCalculator.getUtilization(previousSnapshot, vm.processor);
                previousSnapshot = angular.copy(vm.processor);
            }
        }
    }
})();