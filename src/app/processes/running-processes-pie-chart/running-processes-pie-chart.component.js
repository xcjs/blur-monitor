(function() {
    'use strict';

    angular.module('BlurMonitor.processes').component('runningProcessesPieChart', {
        templateUrl: 'app/processes/running-processes-pie-chart/running-processes-pie-chart.html',
        controller: 'RunningProcessesPieChartController',
        controllerAs: 'vm',
        bindings: {
            processes: '<'
        }
    });
})();