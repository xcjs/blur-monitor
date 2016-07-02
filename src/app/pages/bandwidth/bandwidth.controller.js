(function() {
    'use strict';

    angular.module('BlurMonitor.pages.bandwidth').controller('BandwidthController', [
        '$scope',
        'BandwidthResource',
        BandwidthController]);

    function BandwidthController($scope, BandwidthResource) {
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

        var lastLoaded = 0;
        var lastEnd = null;

        function startTest() {
            vm.progress = 0;
            vm.speed = 0;
            vm.payload = null;
            lastLoaded = 0;
            lastEnd = performance.now();

            vm.startDisabled = true;

            BandwidthResource.addProgressCallback(progressCallback);
            BandwidthResource.addCompleteCallback(completeCallback);
            BandwidthResource.get();
        }

        function progressCallback(event) {
            if (event.lengthComputable) {
                if(!vm.total) {
                    vm.total = Math.round(event.total * 8 / 1000);
                }

                vm.loaded = Math.round(event.loaded * 8 / 1000);

                var percentComplete = event.loaded / event.total * 100;
                vm.progress = percentComplete.toFixed(2);

                var loadDiff = event.loaded - lastLoaded;
                var timeDiff = performance.now() - lastEnd;

                var calcSpeed = (loadDiff * 8 / 1000) / (timeDiff / 1000);
                vm.speed = vm.speed === 0 ? calcSpeed.toFixed(2) : ((parseFloat(vm.speed) + calcSpeed) / 2).toFixed(2);

                lastLoaded = event.loaded;
                lastEnd = performance.now();

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