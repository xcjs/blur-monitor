(function() {
    'use strict';

    angular.module('BlurMonitor.pages.dashboard').controller('DashboardController', DashboardController);

    function DashboardController($scope, $interval, _, refreshInterval, SystemResource) {
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
        }
    }
})();