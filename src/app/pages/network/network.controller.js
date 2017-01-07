(function() {
    'use strict';

    angular.module('BlurMonitor.pages.network').controller('NetworkController', NetworkController);

    function NetworkController($scope, $interval, refreshInterval, NetworkResource) {
        var vm = this;

        registerInterval();

        function registerInterval() {
            loadNetwork();

            vm.interval = $interval(function() {
                loadNetwork();
            }, refreshInterval);

            $scope.$on('$destroy', function() {
                $interval.cancel(vm.interval);
            });
        }

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

        function loadNetwork() {
            NetworkResource.get(function(response) {
                vm.network = response;
            }, function() {
                vm.network = null;
            });
        }
    }
})();