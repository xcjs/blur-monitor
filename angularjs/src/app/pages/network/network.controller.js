(function() {
    'use strict';

    angular.module('BlurMonitor.pages.network').controller('NetworkController', NetworkController);

    function NetworkController($scope, $interval, refreshInterval, NetworkResource) {
        var vm = this;

        registerInterval();

        function registerInterval() {
            loadNetwork();
            loadBandwidth();

            vm.interval = $interval(function() {
                loadNetwork();
                loadBandwidth();
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
            vm.traceroute = response;
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

        function loadBandwidth() {
            NetworkResource.getBandwidth(function(response) {
                vm.bandwidth = response;
            }, function() {
                vm.bandwidth = null;
            });
        }
    }
})();