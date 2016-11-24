(function() {
    'use strict';

    angular.module('BlurMonitor.network').controller('ReverseTracerouteController', ReverseTracerouteController);

    function ReverseTracerouteController() {
        var vm = this;
        vm.isDefined = angular.isDefined;
    }
})();