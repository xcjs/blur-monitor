(function() {
    'use strict';

    angular.module('BlurMonitor.system').component('systemStatus', {
        templateUrl: 'app/system/system-status/system-status.html',
            controller: 'SystemStatusController',
        controllerAs: 'vm',
        bindings: {
            system: '<'
        }
    });
})();