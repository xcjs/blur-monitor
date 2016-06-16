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

        vm.diskColumns = [];

        vm.chartsData = [];
        vm.chartsDataColumns = [];

        vm.chartsLabels = [];
        vm.chartsLabelsColumns = [];

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
                disks.sort(function(diskA, diskB) {
                    if(diskA.mountpoint < diskB.mountpoint) {
                        return -1;
                    } else if (diskA.mountpoint > diskB.mountpoint) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                splitCollectionForView(disks, vm.diskColumns, 2);

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

                splitCollectionForView(vm.chartsData, vm.chartsDataColumns, 2);
                splitCollectionForView(vm.chartsLabels, vm.chartsLabelsColumns, 2);
            });
        }

        function splitCollectionForView(collection, columnCollection, rowSize) {
            var curCol = 0;
            var curRow = 0;

            angular.forEach(collection, function(item) {
                if(curCol === rowSize) {
                    curCol = 0;
                    curRow++;
                }

                if(!angular.isArray(columnCollection[curRow])) {
                    columnCollection[curRow] = [];
                }

                if(!angular.isDefined(columnCollection[curRow][curCol])) {
                    columnCollection[curRow][curCol] = item;
                } else {
                    angular.merge(columnCollection[curRow][curCol], item);
                }

                curCol++;
            });
        }
    }
})();