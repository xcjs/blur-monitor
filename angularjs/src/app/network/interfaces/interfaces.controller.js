(function() {
    'use strict';

    angular.module('BlurMonitor.network').controller('InterfacesController', InterfacesController);

    function InterfacesController() {
        var vm = this;
        vm.isDefined = angular.isDefined;
    }
})();