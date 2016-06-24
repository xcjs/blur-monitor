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
        vm.bandwidth = 0;
        vm.payload = null;

        vm.startDisabled = false;
        vm.startTest = startTest;

        function startTest() {
            vm.progress = 0;
            vm.startDisabled = true;
            BandwidthResource.addProgressCallback(progressCallback);
            BandwidthResource.addCompleteCallback(completeCallback)
            BandwidthResource.get();
        }

        function progressCallback(event) {
            if (event.lengthComputable) {
                var percentComplete = event.loaded / event.total * 100;
                vm.progress = percentComplete.toFixed(2);
                $scope.$apply();
            } else {
                // Unable to compute progress information since the total size is unknown
            }
        }

        function completeCallback() {
            vm.startDisabled = false;
            vm.payload = BandwidthResource.response;
            $scope.$apply();
        }
    }
})();