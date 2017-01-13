(function() {
    'use strict';

    angular.module('BlurMonitor.processes').component('loadedProcessesList', {
        templateUrl: 'app/processes/loaded-processes-list/loaded-processes-list.html',
        controller: 'LoadedProcessesListController',
        controllerAs: 'vm',
        bindings: {
            processes: '<',
            icons: '<'
        }
    });
})();