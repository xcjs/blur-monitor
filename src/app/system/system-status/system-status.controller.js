(function() {
    'use strict';

    angular.module('BlurMonitor.system').controller('SystemStatusController', SystemStatusController);

    function SystemStatusController(moment) {
        var vm = this;

        vm.$onChanges = function(changes) {
            if(changes
                    && changes.system
                    && changes.system.currentValue) {
                vm.system = changes.system.currentValue;
                vm.system.uptime = moment.duration(system.uptime, 'seconds');
            }
        }
    }
})();