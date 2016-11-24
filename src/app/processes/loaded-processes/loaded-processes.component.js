(function() {
    'use strict';

    angular.module('BlurMonitor.processes').component('loadedProcesses', {
        templateUrl: 'app/processes/loaded-processes/loaded-processes.html',
        controller: 'LoadedProcessesController',
        controllerAs: 'vm',
        bindings: {
            processes: '<',
            icons: '<'
        }
    });
})();