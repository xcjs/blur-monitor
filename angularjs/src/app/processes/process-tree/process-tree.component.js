(function() {
    'use strict';

    angular.module('BlurMonitor.processes').component('processTree', {
        templateUrl: 'app/processes/process-tree/process-tree.html',
        controller: 'ProcessTreeController',
        controllerAs: 'vm',
        bindings: {
            processes: '<',
            icons: '<'
        }
    });
})();