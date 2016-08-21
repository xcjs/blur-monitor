(function() {
    'use strict';

    angular.module('BlurMonitor.pages.dashboard').controller('DashboardController', [
        '$scope',
        '$interval',
        '_',
        'refreshInterval',
        'SystemResource',
        'ProcessorResource',
        'processorPercentageThreshold',
        'moment',
        DashboardController]);

    function DashboardController($scope, $interval, _, refreshInterval, SystemResource,
                                 ProcessorResource, processorPercentageThreshold, moment) {
        var vm = this;

        vm.system = null;

        vm.interval = $interval(function() {
            getSystemInfo();
            determineAlerts();
        }, refreshInterval);

        $scope.$on("$destroy", function() {
            $interval.cancel(vm.interval);
        });

        function getSystemInfo() {
            SystemResource.get(function (system) {
                system.uptime = moment.duration(system.uptime, 'seconds');
                vm.system = system;
            });
        }

        function determineAlerts() {
            vm.alerts = vm.alerts || [];

            checkProcessor();
            checkMemory();
            checkDisks();
        }

        function checkProcessor() {
            ProcessorResource.getLoadAvg().$promise.then(function(loadAverages) {
                if(loadAverages[2] > processorPercentageThreshold) {
                    if(!_.find(vm.alerts, {key: 'load15'})) {
                        vm.alerts.push({
                            key: 'load15',
                            class: 'bg-warning',
                            icon: 'ion-arrow-graph-up-right',
                            message: 'The 15 minute load average of the processor is greater than ' + processorPercentageThreshold + '%.'
                        });
                    }
                } else {
                    _.remove(vm.alerts, {
                        key: 'load15'
                    });
                }
            }, function() {
                vm.alerts.push({
                    class: 'bg-error',
                    icon: 'ion-alert',
                    message: 'The processor service isn\'t responding.'
                });
            });
        }

        function checkMemory() {

        }

        function checkDisks() {

        }
    }
})();