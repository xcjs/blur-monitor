(function() {
    'use strict';

    angular.module('BlurMonitor.disks').component('disksPercentageBars', {
        templateUrl: 'app/disks/disks-percentage-bars/disks-percentage-bars.html',
        controller: 'DisksPercentageBarsController',
        controllerAs: 'vm',
        bindings: {
            disks: '<'
        }
    });
})();