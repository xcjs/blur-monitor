(function() {
    'use strict';

    angular.module('BlurMonitor.network').controller('BandwidthLineChartController', BandwidthLineChartController);

    function BandwidthLineChartController(maxSnapshots, refreshInterval) {
        var vm = this;

        vm.chartData = [];
        vm.chartLabels = [];
        vm.chartSeries = [];

        // Being inside of a horizontal tabbed panel cuts down on the available
        // horizontal space.
        vm.maxSnapshots = maxSnapshots / 2;

        vm.maxDownload = 0;
        vm.maxUpload = 0;


        vm.chartOptions = {
            animation: false,
            showTooltips: false
        };

        vm.$onChanges = function() {
            vm.bandwidth = vm.bandwidth[vm.interface];
            updateChart(vm.bandwidth);
        };

        function updateChart(bandwidth) {
            if(bandwidth.in > vm.maxDownload) {
                vm.maxDownload = bandwidth.in;
            }

            if(bandwidth.out > vm.maxUpload) {
                vm.maxUpload = bandwidth.out;
            }

            vm.chartSeries[0] = 'Download ' + bandwidth.in + ' kbps / ' + vm.maxDownload + ' kbps';
            vm.chartSeries[1] = 'Upload ' + bandwidth.out + ' kbps / ' + vm.maxUpload + ' kbps';

            if(!angular.isArray(vm.chartData[0])) {
                vm.chartData[0] = [];
            }

            if(!angular.isArray(vm.chartData[1])) {
                vm.chartData[1] = [];
            }

            if(vm.chartLabels.length < vm.maxSnapshots) {
                vm.chartLabels.unshift((vm.chartLabels.length + 1) * (refreshInterval / 1000) + 's ago')
            }

            if (vm.chartData[0].length >= vm.maxSnapshots) {
                vm.chartData[0].splice(0, 1);
                vm.chartData[1].splice(0, 1);
            }

            vm.chartData[0].push(bandwidth.in);
            vm.chartData[1].push(bandwidth.out);
        }
    }
})();
