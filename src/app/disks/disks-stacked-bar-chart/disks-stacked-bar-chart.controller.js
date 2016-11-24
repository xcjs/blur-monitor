(function() {
    'use strict';

    angular.module('BlurMonitor.disks').controller('DisksStackedBarChartController', DisksStackedBarChartController);

    function DisksStackedBarChartController() {
        var vm = this;

        vm.disks = [];
    }
})();