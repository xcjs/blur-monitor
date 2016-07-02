(function() {
    'use strict';

    angular.module('BlurMonitor.pages.bandwidth').controller('BandwidthController', [
        '$scope',
        'BandwidthResource',
        'moment',
        BandwidthController]);

    function BandwidthController($scope, BandwidthResource, moment) {
        var vm = this;

        vm.chartsData = [];
        vm.chartsDataColumns = [];

        vm.chartsLabels = [];
        vm.chartsLabelsColumns = [];

        vm.chartOptions = {
            animation: false,
            showTooltips: false
        };

        vm.progress = 0;
        vm.speed = 0;
        vm.payload = null;

        vm.loaded = 0;
        vm.total = 0;

        vm.startDisabled = false;
        vm.startTest = startTest;

        vm.start = 0;
        vm.end = 0;

        var lastLoaded = 0;

        function startTest() {
            vm.progress = 0;
            vm.speed = 0;
            vm.payload = null;
            lastLoaded = 0;

            vm.startDisabled = true;

            vm.start = moment();

            BandwidthResource.addProgressCallback(progressCallback);
            BandwidthResource.addCompleteCallback(completeCallback);
            BandwidthResource.get();
        }

        function progressCallback(event) {
            if (event.lengthComputable) {
                if(!vm.total) {
                    vm.total = event.total * 8 / 1000;
                }

                vm.loaded = event.loaded * 8 / 1000;

                var percentComplete = event.loaded / event.total * 100;
                vm.progress = percentComplete.toFixed(2);

                vm.end = moment();

                var calcSpeed = (((event.loaded - lastLoaded) * 8 / 1000) / (vm.end.unix() - vm.start.unix()));
                vm.speed = vm.speed === 0 ? calcSpeed.toFixed(2) : ((parseFloat(vm.speed) + calcSpeed) / 2).toFixed(2);

                lastLoaded = event.loaded;

                $scope.$apply();
            }
        }

        function completeCallback() {
            vm.startDisabled = false;
            vm.payload = BandwidthResource.response;
            $scope.$apply();
        }
    }
})();