(function() {
    'use strict';

    angular.module('BlurMonitor.network').component('reverseTraceroute', {
        templateUrl: 'app/network/reverse-traceroute/reverse-traceroute.html',
        controller: 'ReverseTracerouteController',
        controllerAs: 'vm',
        bindings: {
            traceroute: '<'
        }
    });
})();
