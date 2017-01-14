(function() {
    'use strict';

    angular.module('BlurMonitor.processes').component('loadedProcessesPieChart', {
        templateUrl: 'app/processes/loaded-processes-pie-chart/loaded-processes-pie-chart.html',
        controller: 'LoadedProcessesPieChartController',
        controllerAs: 'vm',
        bindings: {
            processes: '<'
        }
    });
})();
