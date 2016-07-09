(function() {
    'use strict';

    angular.module('BlurMonitor.pages.processes').controller('ProcessesController', [
        '$scope',
        '$interval',
        'refreshInterval',
        'ProcessesResource',
        ProcessesController]);

    function ProcessesController($scope, $interval, refreshInterval, ProcessesResource) {
        var vm = this;
        vm.processes = [];

        vm.interval = $interval(function() {
            getProcesses();
        }, refreshInterval);

        $scope.$on('$destroy', function() {
            $interval.cancel(vm.interval);
        });

        function getProcesses() {
            ProcessesResource.query().$promise.then(function(response) {
                vm.processes = response;
            });
        }
    }
})();