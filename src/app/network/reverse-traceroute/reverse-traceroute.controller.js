(function() {
    'use strict';

    angular.module('BlurMonitor.network').controller('ReverseTracerouteController', ReverseTracerouteController);

    function ReverseTracerouteController() {
        var vm = this;

        vm.$doCheck = checkTracerouteDefined;

        function checkTracerouteDefined() {
            vm.tracerouteDefined = angular.isDefined(vm.traceroute);
        }
    }
})();