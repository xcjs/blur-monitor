(function() {
    'use strict';

    angular.module('BlurMonitor.disks').controller('DisksStackedBarChartController', DisksStackedBarChartController);

    function DisksStackedBarChartController() {
        var vm = this;

        vm.disks = [];

        vm.$onChanges = function(changes) {
            if(changes
                && changes.disks
                && changes.disks.currentValue) {

                changes.disks.currentValue.sort(function(diskA, diskB) {
                    if(diskA.drive < diskB.drive) {
                        return -1;
                    } else if (diskA.drive > diskB.drive) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }
        }
    }
})();