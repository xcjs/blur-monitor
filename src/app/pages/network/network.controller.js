(function() {
    'use strict';

    angular.module('BlurMonitor.pages.network').controller('NetworkController', NetworkController);

    function NetworkController(NetworkResource) {
        var vm = this;

        NetworkResource.get(function(response) {
            vm.interfaces = response;
        }, function() {
            vm.interfaces = null;
        });

        NetworkResource.getExternal(function(response) {
            vm.externalIp = response.ipAddress;
        }, function() {
            vm.externalIp = null;
        });

        NetworkResource.getTraceroute(function(response) {
            vm.tracerouteLoading = false;

            if(!angular.isDefined(vm.traceroute)) {
                vm.traceroute = [];
            }

            angular.forEach(response.traceroute, function(hop) {
                vm.traceroute.push(hop);
            });
        }, function() {
            vm.traceroute = null;
        });
    }
})();