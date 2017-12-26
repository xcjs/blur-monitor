(function() {
    'use strict';

    angular.module('BlurMonitor.memory').controller('MemorySwapPieChartController', MemorySwapPieChartController);

    function MemorySwapPieChartController(memoryPercentageThreshold) {
        var vm = this;

        vm.title = 'Swap Utilization';
        vm.memoryPercentageThreshold = memoryPercentageThreshold;

        vm.chartOptions = {
            animation: false,
            showTooltips: false
        };

        vm.usedMemoryPercent = null;

        vm.chartData = [];
        vm.chartLabels = [];

        vm.$onChanges = function() {
            updateChart(vm.memory);
        };

        function updateChart(swap) {
            vm.chartData[0] = swap.used;
            vm.chartLabels[0] = buildChartLabel('Used', swap.used, calcSwapPercent);

            vm.usedPercent = calcSwapPercent(vm.chartData[0]);

            vm.chartData[1] = (swap.total - swap.used).toFixed(2);
            vm.chartLabels[1] = buildChartLabel('Free', vm.chartData[1]);
        }

        function buildChartLabel(label, value) {
            return label + ': ' + value + ' MB (' + calcSwapPercent(value)  + ')%';
        }

        function calcSwapPercent(part) {
            return (part / vm.memory.total * 100).toFixed(2);
        }
    }
})();