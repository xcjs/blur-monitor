(function() {
    'use strict';

    angular.module('BlurMonitor.memory').controller('MemoryDetailedPieChartController', MemoryDetailedPieChartController);

    function MemoryDetailedPieChartController(memoryPercentageThreshold) {
        var vm = this;

        vm.title = 'Detailed Memory Utilization';
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

        function updateChart(memory) {
            vm.chartData[0] = (memory.used - memory.shared).toFixed(0);
            vm.chartLabels[0] = buildChartLabel('Used (Protected)', vm.chartData[0]);

            vm.chartData[1] = memory.shared;
            vm.chartLabels[1] = buildChartLabel('Used (Shared)', memory.shared);

            vm.chartData[2] = memory.cache;
            vm.chartLabels[2] = buildChartLabel('Cache/Buffers', memory.cache);

            vm.chartData[3] = memory.free;
            vm.chartLabels[3] = buildChartLabel('Free', memory.free);
        }

        function buildChartLabel(label, value) {
            return label + ': ' + value + ' MB (' + calcTotalMemPercent(value)  + ')%';
        }

        function calcTotalMemPercent(part) {
            return (part / vm.memory.total * 100).toFixed(2);
        }
    }
})();