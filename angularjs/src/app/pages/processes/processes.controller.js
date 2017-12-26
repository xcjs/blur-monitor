(function() {
    'use strict';

    angular.module('BlurMonitor.pages.processes').controller('ProcessesController', ProcessesController);

    function ProcessesController($scope, $interval, refreshInterval, ProcessResource, AssetsResource) {
        var vm = this;

        loadProcesses();
        vm.interval = $interval(function() {
            loadProcesses();
        }, refreshInterval);

        AssetsResource.getApps(function(icons) {
            vm.icons = icons;
        });

        $scope.$on("$destroy", function() {
            $interval.cancel(vm.interval);
        });

        function loadProcesses() {
            ProcessResource.query(function(processes) {
                vm.processes = processes;
            });
        }
    }
})();