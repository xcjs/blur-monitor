(function() {
    'use strict';

    angular.module('BlurMonitor.pages.processor').controller('ProcessorController', [
        '$scope',
        '$interval',
        'refreshInterval',
        'maxSnapshots',
        'ProcessorResource',
        'ProcessorStats',
        'bootstrapFactory',
        'processorPercentageThreshold',
        ProcessorController]);

        function ProcessorController($scope, $interval, refreshInterval, maxSnapshots, ProcessorResource, ProcessorStats,
        bootstrapFactory, processorPercentageThreshold) {
            var vm = this;

            vm.processorInfo = [];
            vm.processorInfoColumns = [];

            vm.processorPercentageThreshold = processorPercentageThreshold;

            vm.chartData = [];
            vm.chartLabels = [];
            vm.chartSeries = [];

            vm.chartOptions = {
                animation: false,
                showTooltips: false,
                scaleOverride : true,
                scaleSteps : 10,
                scaleStepWidth : 10,
                scaleStartValue : 0
            };

            // Historic snapshots of the full processor data up to maxSnapshots.
            vm.snapshots = [];

            vm.interval = null;

            getProcessor();
            vm.interval = $interval(function() {
                getProcessor();
            }, refreshInterval);

            $scope.$on("$destroy", function() {
                $interval.cancel(vm.interval);
            });

            function getProcessor() {
                ProcessorResource.query().$promise.then(function(processors) {
                    angular.forEach(processors, function(processor, index) {
                        var utilization = 0;

                        if(!vm.processorInfo[index]) {
                            vm.processorInfo[index] = processor;
                        } else {
                            vm.processorInfo[index].speed = processor.speed;
                        }

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
                            utilization = ProcessorStats.getUtilization(
                                processorHistory[processorHistory.length - 2], processorHistory[processorHistory.length - 1]);
                        } else {
                            // With no historical information available, assume 0% utilization.
                            utilization = 0;
                        }

                        processorUtil.push(utilization);

                        vm.chartSeries[index] = 'Processor ' + index + ' - ' + utilization + '%';

                    });

                    if(vm.chartLabels.length > maxSnapshots) {
                        vm.chartLabels.splice(0, 1);
                    }

                    if(vm.chartLabels.length < maxSnapshots) {
                        var label = vm.snapshots[0].length * (refreshInterval / 1000) + 's ago';

                        vm.chartLabels.unshift(label);
                    }

                    bootstrapFactory.splitCollectionForColumns(vm.processorInfo, vm.processorInfoColumns, 4);
                });
            }
        }
})();