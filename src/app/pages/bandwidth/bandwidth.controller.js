(function() {
    'use strict';

    angular.module('BlurMonitor.pages.bandwidth').controller('BandwidthController', [
        '$scope',
        'BandwidthResource',
        BandwidthController]);

    function BandwidthController($scope, BandwidthResource) {
        var vm = this;

        vm.startDisabled = false;
        vm.startTest = startTest;

        vm.currentDataSet = null;

        vm.getStats = {
            method: 'GET',
            progress: 0,
            speed: 0,
            response: null,
            loaded: 0,
            lastLoaded: 0,
            lastEnd: null
        };

        vm.postStats = {
            method: 'POST',
            progress: 0,
            speed: 0,
            response: null,
            loaded: 0,
            lastLoaded: 0,
            lastEnd: null
        };

        BandwidthResource.addProgressCallback(function(event) {
            progressCallback(vm.currentDataSet, event);
        });

        BandwidthResource.addCompleteCallback(function(event) {
            completeCallback(vm.currentDataSet, event);
        });

        function startTest(dataSet) {
            vm.currentDataSet = dataSet;

            dataSet.progress = 0;
            dataSet.speed = 0;
            dataSet.payload = null;
            dataSet.lastLoaded = 0;
            dataSet.lastEnd = performance.now();

            vm.startDisabled = true;

            if(dataSet.method === 'GET') {
                BandwidthResource.get();
            } else if(dataSet.method === 'POST') {
                BandwidthResource.post(vm.getStats.response, 'text/plain');
            }
        }

        function progressCallback(dataSet, event) {
            if (event.lengthComputable) {
                if(!dataSet.total) {
                    dataSet.total = Math.round(event.total * 8 / 1000);
                }

                dataSet.loaded = Math.round(event.loaded * 8 / 1000);

                var percentComplete = event.loaded / event.total * 100;
                dataSet.progress = percentComplete.toFixed(2);

                var loadDiff = event.loaded - dataSet.lastLoaded;
                var timeDiff = performance.now() - dataSet.lastEnd;

                var calcSpeed = (loadDiff * 8 / 1000) / (timeDiff / 1000);
                dataSet.speed = dataSet.speed === 0 ? calcSpeed.toFixed(2) : ((parseFloat(dataSet.speed) + calcSpeed) / 2).toFixed(2);

                dataSet.lastLoaded = event.loaded;
                dataSet.lastEnd = performance.now();

                $scope.$apply();
            }
        }

        function completeCallback(dataSet) {
            vm.startDisabled = false;
            dataSet.response = BandwidthResource.response;
            $scope.$apply();

            if(dataSet.method === 'GET') {
                startTest(vm.postStats);
            }
        }
    }
})();