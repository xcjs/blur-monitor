(function() {
    'use strict';

    angular.module('BlurMonitor.pages.disks').controller('DisksController', DisksController);

    function DisksController($scope, $interval, refreshInterval, DiskResource, bootstrapFactory) {
        var vm = this;

        vm.diskColumns = [];

        registerInterval();

        function registerInterval() {
            loadDisks();
            vm.interval = $interval(function() {
                loadDisks();
            }, refreshInterval);

            $scope.$on('$destroy', function() {
                $interval.cancel(vm.interval);
            });
        }

        function loadDisks() {
            DiskResource.query(function(disks) {
                disks.sort(function(diskA, diskB) {
                    if(diskA.mountpoint < diskB.mountpoint) {
                        return -1;
                    } else if (diskA.mountpoint > diskB.mountpoint) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                bootstrapFactory.splitCollectionForColumns(disks, vm.diskColumns, 3);
            });
        }
    }
})();