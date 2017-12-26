(function() {
    'use strict';

    angular.module('BlurMonitor.network').component('externalIp', {
        templateUrl: 'app/network/external-ip/external-ip.html',
        controller: 'ExternalIpController',
        controllerAs: 'vm',
        bindings: {
            externalIp: '<'
        }
    });
})();
