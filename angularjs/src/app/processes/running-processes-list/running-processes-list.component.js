(function() {
    'use strict';

    angular.module('BlurMonitor.processes').component('runningProcessesList', {
        templateUrl: 'app/processes/running-processes-list/running-processes-list.html',
        controller: 'RunningProcessesListController',
        controllerAs: 'vm',
        bindings: {
            processes: '<',
            icons: '<'
        }
    });
})();
