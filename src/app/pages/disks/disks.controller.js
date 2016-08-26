(function() {
    'use strict';

    angular.module('BlurMonitor.pages.disks').controller('DisksController', [
        '$scope',
        '$interval',
        'refreshInterval',
        'DisksResource',
        'bootstrapFactory',
        DisksController]);

    function DisksController($scope, $interval, refreshInterval, DisksResource, bootstrapFactory) {
        var vm = this;

        var columns = 3;

        vm.diskColumns = [];

        vm.chartsData = [];
        vm.chartsDataColumns = [];

        vm.chartsLabels = [];
        vm.chartsLabelsColumns = [];

        vm.chartOptions = {
            animation: false,
            showTooltips: false
        };

        getDisks();
        vm.interval = $interval(function() {
            getDisks();
        }, refreshInterval);

        $scope.$on('$destroy', function() {
            $interval.cancel(vm.interval);
        });

        function getDisks() {
            DisksResource.query(function(disks) {
                disks.sort(function(diskA, diskB) {
                    if(diskA.mountpoint < diskB.mountpoint) {
                        return -1;
                    } else if (diskA.mountpoint > diskB.mountpoint) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                bootstrapFactory.splitCollectionForColumns(disks, vm.diskColumns, columns);

                angular.forEach(disks, function(disk, index) {
                    if(!angular.isArray(vm.chartsData[index])) {
                        vm.chartsData[index] = [];
                        vm.chartsLabels[index] = [];
                    }

                    vm.chartsData[index][0] = disk.usedPer;
                    vm.chartsData[index][1] = disk.freePer;

                    vm.chartsLabels[index][0] = 'Used: ' + disk.used;
                    vm.chartsLabels[index][1] = 'Free: ' + disk.available;
                });

                bootstrapFactory.splitCollectionForColumns(vm.chartsData, vm.chartsDataColumns, columns);
                bootstrapFactory.splitCollectionForColumns(vm.chartsLabels, vm.chartsLabelsColumns, columns);
            });
        }
    }
})();