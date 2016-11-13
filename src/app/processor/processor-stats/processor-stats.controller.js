(function() {
    'use strict';

    angular.module('BlurMonitor.processor').controller('ProcessorStatsController', ProcessorStatsController);

    function ProcessorStatsController(ProcessorUtilizationCalculator) {
        var vm = this;

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