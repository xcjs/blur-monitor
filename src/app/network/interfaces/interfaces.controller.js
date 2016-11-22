(function() {
    'use strict';

    angular.module('BlurMonitor.network').controller('InterfacesController', InterfacesController);

    function InterfacesController() {
        var vm = this;

        vm.$doCheck = checkInterfacesDefined();

        function checkInterfacesDefined() {
            vm.interfacesDefined = angular.isDefined(vm.interfaces);
        }
    }
})();