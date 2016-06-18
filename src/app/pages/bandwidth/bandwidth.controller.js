(function() {
    'use strict';

    angular.module('BlurMonitor.pages.bandwidth').controller('BandwidthController', [
        'BandwidthResource',
        BandwidthController]);

    function BandwidthController(BandwidthResource) {
        var vm = this;

        vm.chartsData = [];
        vm.chartsDataColumns = [];

        vm.chartsLabels = [];
        vm.chartsLabelsColumns = [];

        vm.chartOptions = {
            animation: false,
            showTooltips: false
        };
    }
})();