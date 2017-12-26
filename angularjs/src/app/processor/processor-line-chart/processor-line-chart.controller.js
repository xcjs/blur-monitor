(function() {
    'use strict';

    angular.module('BlurMonitor.processor').controller('ProcessorLineChartController', ProcessorLineChartController);

    function ProcessorLineChartController(refreshInterval, maxSnapshots, ProcessorUtilizationCalculator) {
        var vm = this;

        vm.processors = [];

        // Historic snapshots of the full processor data up to maxSnapshots.
        vm.lastSnapshot;
        vm.snapshots = [];

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

        vm.$onChanges = function() {
            if(!angular.equals(vm.processors, vm.lastSnapshot)) {
                updateChart(vm.processors, vm.memory);
            }

            vm.lastSnapshot = vm.processors;
        };

        function updateChart(processors, memory) {
            angular.forEach(processors, function (processor, i) {
                var utilization = 0;

                // The first time run through this call back, the child arrays will need to be initialized for
                // each core/processor.
                if (!angular.isArray(vm.chartData[i])) {
                    vm.chartData[i] = new Array(maxSnapshots);
                    vm.snapshots[i] = new Array(maxSnapshots);

                    if(vm.chartLabels.length !== maxSnapshots) {
                        for (var snapShotsIndex = 0; snapShotsIndex < maxSnapshots; snapShotsIndex++) {
                            vm.chartLabels.unshift((snapShotsIndex + 1) * (refreshInterval / 1000) + 's ago')
                        }
                    }
                }

                var processorUtil = vm.chartData[i];
                var processorHistory = vm.snapshots[i];

                // Once we hit the maxSnapshots limit, the chart data for the current processor and processor
                // historical data needs to be spliced to recycle memory.
                if (processorUtil.length >= maxSnapshots) {
                    processorUtil.splice(0, 1);
                    processorHistory.splice(0, 1);
                }

                // Append the current processor snapshot to the processor history.
                processorHistory.push(processor);

                if (processorUtil.length > 1) {
                    utilization = ProcessorUtilizationCalculator.getUtilization(
                        processorHistory[processorHistory.length - 2], processorHistory[processorHistory.length - 1]);
                } else {
                    // With no historical information available, assume 0% utilization.
                    utilization = 0;
                }

                processorUtil.push(utilization);

                vm.chartSeries[i] = 'Processor ' + i + ' - ' + utilization + '%';

            });

            if(processors.length > 0) {
                if (vm.chartLabels.length > maxSnapshots) {
                    vm.chartLabels.splice(0, 1);
                }

                if (vm.chartLabels.length < maxSnapshots) {
                    var label = vm.snapshots[0].length * (refreshInterval / 1000) + 's ago';

                    vm.chartLabels.unshift(label);
                }
            }

            if(processors.length > 0 && memory) {
                var utilization = 0;

                var memoryIndex = processors.length;

                if(vm.chartData.length === processors.length) {
                    vm.chartData[memoryIndex] = new Array(maxSnapshots);
                    vm.snapshots[memoryIndex] = new Array(maxSnapshots);
                }

                // Once we hit the maxSnapshots limit, the chart data for the memory utilization
                // historical data needs to be spliced to recycle memory.
                if (vm.chartData[memoryIndex].length >= maxSnapshots) {
                    vm.chartData[memoryIndex].splice(0, 1);
                    vm.snapshots[memoryIndex].splice(0, 1);
                }

                if (vm.chartData[memoryIndex].length > 1) {
                    utilization = memory.used / memory.total * 100;
                } else {
                    // With no historical information available, assume 0% utilization.
                    utilization = 0;
                }

                vm.chartData[memoryIndex].push(utilization);
                // Append the current memory snapshot to the memory history.
                vm.snapshots[memoryIndex].push(memory);
                vm.chartSeries[memoryIndex] = 'Memory - ' + utilization.toFixed(2) + '%';
            }
        }
    }
})();