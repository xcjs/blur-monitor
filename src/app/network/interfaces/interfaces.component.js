(function() {
    'use strict';

    angular.module('BlurMonitor.network').component('interfaces', {
        templateUrl: 'app/network/interfaces/interfaces.html',
        controller: 'InterfacesController',
        controllerAs: 'vm',
        bindings: {
            network: '<',
            bandwidth: '<'
        }
    });
})();
