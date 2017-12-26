(function() {
    'use strict';

    angular.module('BlurMonitor.pages.dashboard').controller('DashboardController', DashboardController);

    function DashboardController($scope, $interval, _, refreshInterval,
                                 SystemResource, ProcessorResource, MemoryResource,
                                NetworkResource, DiskResource) {
        var vm = this;

        registerInterval();

        function registerInterval() {
            loadData();

            vm.interval = $interval(function () {
                loadData();
            }, refreshInterval);

            $scope.$on("$destroy", function() {
                $interval.cancel(vm.interval);
            });
        }

        function loadData() {
            SystemResource.get(function (system) {
                vm.system = system;
            });

            ProcessorResource.query(function (processors) {
                vm.processors = processors;
            });

            MemoryResource.get(function (memory) {
                vm.memory = memory;
            });

            DiskResource.query(function(disks) {
                vm.disks = disks;
            });

            NetworkResource.getExternal(function(response) {
                vm.externalIp = response.ipAddress;
            }, function() {
                vm.externalIp = null;
            });
        }
    }
})();