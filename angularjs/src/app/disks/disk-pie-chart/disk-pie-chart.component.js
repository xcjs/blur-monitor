(function() {
    'use strict';

    angular.module('BlurMonitor.processor').component('diskPieChart', {
        templateUrl: 'app/disks/disk-pie-chart/disk-pie-chart.html',
        controller: 'DiskPieChartController',
        controllerAs: 'vm',
        bindings: {
            disk: '<'
        }
    });
})();
