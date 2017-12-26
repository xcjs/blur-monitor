(function() {
    'use strict';

    angular.module('BlurMonitor.disks').controller('DisksPercentageBarsController', DisksPercentageBarsController);

    function DisksPercentageBarsController(bootstrapFactory) {
        var vm = this;

        vm.disks = [];
        vm.diskColumns = [];

        vm.$onChanges = function() {
            vm.disks.sort(function(diskA, diskB) {
                if(diskA.drive < diskB.drive) {
                    return -1;
                } else if (diskA.drive > diskB.drive) {
                    return 1;
                } else {
                    return 0;
                }
            });

            bootstrapFactory.splitCollectionForColumns(vm.disks, vm.diskColumns, 4);
        }
    }
})();