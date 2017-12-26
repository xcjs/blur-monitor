(function() {
    'use strict';

    angular.module('BlurMonitor.memory').controller('MemoryActivePieChartController', MemoryActivePieChartController);

    function MemoryActivePieChartController(memoryPercentageThreshold) {
        var vm = this;

        vm.title = 'Active Memory Utilization';

        vm.memoryPercentageThreshold = memoryPercentageThreshold;

        vm.chartOptions = {
            animation: false,
            showTooltips: false
        };

        vm.usedMemoryPercent = null;

        vm.chartData = [];
        vm.chartLabels = [];

        vm.$onChanges = function(changes) {
            if(changes
                && changes.memory
                && changes.memory.currentValue) {
                updateChart(vm.memory);
            }
        };

        function updateChart(memory) {
            vm.usedMemoryPercent = calcTotalMemPercent(memory.used);

            vm.chartData[0] = memory.used;
            vm.chartLabels[0] = buildChartLabel('Used', memory.used);

            vm.chartData[1] = (memory.total - memory.used).toFixed(0);
            vm.chartLabels[1] = buildChartLabel('Available', vm.chartData[1]);
        }

        function buildChartLabel(label, value) {
            return label + ': ' + value + ' MB (' + calcTotalMemPercent(value)  + ')%';
        }

        function calcTotalMemPercent(part) {
            return (part / vm.memory.total * 100).toFixed(2);
        }
    }
})();