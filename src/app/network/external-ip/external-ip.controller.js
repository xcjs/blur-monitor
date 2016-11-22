(function() {
    'use strict';

    angular.module('BlurMonitor.network').controller('ExternalIpController', ExternalIpController);

    function ExternalIpController() {
        var vm = this;

        vm.$doCheck = checkExternalIpDefined;

        function checkExternalIpDefined() {
            vm.externalIpDefined = angular.isDefined(vm.externalIp);
        }
    }
})();