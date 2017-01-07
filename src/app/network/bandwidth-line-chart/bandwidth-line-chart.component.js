(function() {
    'use strict';

    angular.module('BlurMonitor.network').component('bandwidthLineChart', {
        templateUrl: 'app/network/bandwidth-line-chart/bandwidth-line-chart.html',
        controller: 'BandwidthLineChartController',
        controllerAs: 'vm',
        bindings: {
            interface: '<',
            bandwidth: '<',
            showPanel: '<'
        }
    });
})();
