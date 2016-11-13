(function() {
    'use strict';

    angular.module('BlurMonitor.processor').service('ProcessorUtilizationCalculator', ProcessorUtilizationCalculator);

    function ProcessorUtilizationCalculator() {
        this.getUtilization = getUtilization;

        function getUtilization(previousSnapshot, currentSnapshot) {
            var utilization = 0;

            if(previousSnapshot) {
                var prevTicks = getTotalTicks(previousSnapshot);
                var currTicks = getTotalTicks(currentSnapshot);

                var prevIdle = previousSnapshot.times.idle;
                var currIdle = currentSnapshot.times.idle;

                utilization = (currIdle - prevIdle) / (currTicks - prevTicks);
            }

            return (100 - (utilization * 100)).toFixed(2);
        }

        function getTotalTicks(snapShot) {
            var totalTicks = 0;

            angular.forEach(snapShot.times, function(time) {
                totalTicks += time;
            });

            return totalTicks;
        }
    }
})();
