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

        vm.startDisabled = false;
        vm.startTest = startTest;

        vm.start = 0;
        vm.end = 0;

        function startTest() {
            vm.progress = 0;
            vm.startDisabled = true;

            vm.start = moment();

            BandwidthResource.addProgressCallback(progressCallback);
            BandwidthResource.addCompleteCallback(completeCallback);
            BandwidthResource.get();
        }

        function progressCallback(event) {
            if (event.lengthComputable) {
                var percentComplete = event.loaded / event.total * 100;
                vm.progress = percentComplete.toFixed(2);

                vm.end = moment();
                vm.speed = ((event.loaded / 1000) / vm.end.seconds()).toFixed(2);

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