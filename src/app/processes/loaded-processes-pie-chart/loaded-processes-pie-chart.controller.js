(function() {
    angular.module('BlurMonitor.processes').controller('LoadedProcessesPieChartController', LoadedProcessesPieChartController);

    function LoadedProcessesPieChartController() {
        var vm = this;

        vm.title = 'Loaded Processes';

        vm.chartOptions = {
            animation: false,
            showTooltips: true,
            tooltipTemplate: "<%if (label){%><%=label%><%}%>"
        };

        vm.chartData = [];
        vm.chartLabels = [];

        vm.$onChanges = function() {
            if(vm.processes) {
                updateChart(vm.processes);
            }
        };

        function updateChart(processes) {
            processes = filterProcesses(processes);

            vm.chartData.length = 0;
            vm.chartLabels.length = 0;

            angular.forEach(processes, function(process) {
                vm.chartData.push(parseFloat(process.memoryUtilization));
                vm.chartLabels.push(process.name + ' (' + process.memoryUtilization + '%)');
            });
        }

        function filterProcesses(processes) {
            processes = processes.filter(function(process) {
                if(parseFloat(process.memoryUtilization) > 0) {
                    return process;
                }
            });

            processes.sort(function(a, b) {
                return b.memoryUtilization - a.memoryUtilization;
            });

            angular.forEach(processes, function(process) {
                process.name = getProcessName(process.command);
                process.icon = '/assets/img/app/apps/' + process.name + '.svg';
            });

            return processes;
        }

        function getProcessName(command) {
            if (command.indexOf(' ') > -1) {
                command = command.substr(0, command.indexOf(' '));
            }

            if (command.indexOf('/') > -1 && command.indexOf('[') === -1) {
                command = command.substr(command.lastIndexOf('/') + 1, command.length - command.lastIndexOf('/'));
            }

            // TODO: Add icon support

            return command;
        }
    }
})();