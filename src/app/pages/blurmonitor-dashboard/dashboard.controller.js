(function() {
    'use strict';

    angular.module('BlurMonitor.pages.dashboard').controller('DashboardController', [
        '$scope',
        '$interval',
        'refreshInterval',
        'SystemResource',
        'moment',
        DashboardController]);

    function DashboardController($scope, $interval, refreshInterval, SystemResource, moment) {
        var vm = this;

        vm.system = null;

        vm.interval = $interval(function() {
            getSystemInfo();
        }, refreshInterval);

        $scope.$on("$destroy", function() {
            $interval.cancel(vm.interval);
        });

        function getSystemInfo() {
            SystemResource.get(function (system) {
                system.uptime = moment.duration(system.uptime, 'seconds');
                vm.system = system;
            });
        }
    }
})();