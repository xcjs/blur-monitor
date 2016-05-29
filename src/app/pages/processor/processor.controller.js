(function() {
    'use strict';

    angular.module('BlurMonitor.pages.processor').controller('ProcessorController', [
        '$interval',
        'refreshInterval',
        'maxSnapshots',
        'ProcessorResource',
        'processorStats',
        ProcessorController]);

        function ProcessorController($interval, refreshInterval, maxSnapshots, ProcessorResource, processorStats) {
            var vm = this;

            vm.chartData = [];

            // Historic snapshots of the full processor data up to maxSnapshots.
            vm.snapshots = [];

            vm.labels = [];

            vm.chartOptions = {
                animation: false
            };

            setLabels();

            $interval(function() {
                getProcessor();
            }, refreshInterval);

            function setLabels() {
                var snapshotCounter = 0;
                while(snapshotCounter <= maxSnapshots) {
                    var label = maxSnapshots - snapshotCounter + (refreshInterval / 1000) + ' s ago';

                    vm.labels.push(label);
                    snapshotCounter++;
                }
            }

            function getProcessor() {
                ProcessorResource.query().$promise.then(function(processors) {
                    angular.forEach(processors, function(processor, index) {
                        var utilization = 0;

                        // The first time run through this call back, the child arrays will need to be initialized for
                        // each core/processor.
                        if(!angular.isArray(vm.chartData[index])) {
                            vm.chartData[index] = [];
                            vm.snapshots[index] = [];
                        }

                        var processorUtil = vm.chartData[index];
                        var processorHistory = vm.snapshots[index];

                        // Once we hit the maxSnapshots limit, the chart data for the current processor and processor
                        // historical data needs to be spliced to recycle memory.
                        if(processorUtil.length >= maxSnapshots) {
                            processorUtil.splice(0, 1);
                            processorHistory.splice(0, 1);
                        }

                        // Append the current processor snapshot to the processor history.
                        processorHistory.push(processor);

                        if(processorUtil.length > 1) {
                            utilization = processorStats.getUtilization(
                                processorHistory[processorHistory.length - 2], processorHistory[processorHistory.length - 1]);
                        } else {
                            // With no historical information available, assume 0% utilization.
                            utilization = 0;
                        }

                        processorUtil.push(utilization);
                    });

                    if(vm.labels.length >= maxSnapshots) {
                        vm.labels.splice(0, 1);
                    }
                });
            }
        }
})();