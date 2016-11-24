(function() {
    'use strict';

    angular.module('BlurMonitor.processes').component('runningProcesses', {
        templateUrl: 'app/processes/running-processes/running-processes.html',
        controller: 'RunningProcessesController',
        controllerAs: 'vm',
        bindings: {
            processes: '<',
            icons: '<'
        }
    });
})();
