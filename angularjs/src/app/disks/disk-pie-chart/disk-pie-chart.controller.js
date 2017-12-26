(function() {
    'use strict';

    angular.module('BlurMonitor.disks').controller('DiskPieChartController', DiskPieChartController);

    function DiskPieChartController() {
        var vm = this;

        vm.chartOptions = {
            animation: false,
            showTooltips: false
        };

        vm.chartData = [];
        vm.chartLabels = [];

        vm.$doCheck = function() {
            updateChart(vm.disk);
        };

        function updateChart(disk) {
            vm.chartData[0] = disk.usedPer;
            vm.chartData[1] = disk.freePer;

            vm.chartLabels[0] = 'Used: ' + disk.used;
            vm.chartLabels[1] = 'Free: ' + disk.available;
        }
    }
})();
