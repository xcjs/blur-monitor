(function() {
    'use strict';

    angular.module('BlurMonitor.pages.disks').controller('DisksController', [
        '$scope',
        '$interval',
        'refreshInterval',
        'DisksResource',
        DisksController]);

    function DisksController($scope, $interval, refreshInterval, DisksResource) {
        var vm = this;

        vm.disks = [];

        vm.chartData = [];
        vm.chartLabels = [];
        vm.chartSeries = [];
        vm.chartOptions = {
            animation: false
        };

        vm.interval = $interval(function() {
            getDisks();
        }, refreshInterval);

        $scope.$on('$destroy', function() {
            $interval.cancel(vm.interval);
        });

        function getDisks() {
            DisksResource.query(function(disks) {

            });
        }
    }
})();