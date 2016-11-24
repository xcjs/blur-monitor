(function() {
    'use strict';

    angular.module('BlurMonitor.disks').component('disksStackedBarChart', {
        templateUrl: 'app/disks/disks-stacked-bar-chart/disks-stacked-bar-chart.html',
        controller: 'DisksStackedBarChartController',
        controllerAs: 'vm',
        bindings: {
            disks: '<'
        }
    });
})();