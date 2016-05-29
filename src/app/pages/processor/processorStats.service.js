(function() {
    'use strict';

    angular.module('BlurMonitor.pages.processor').factory('processorStats',
        [processorStats]);

    function processorStats() {
        return {
            getUtilization: getUtilization
        };

        function getUtilization(previousSnapshot, currentSnapshot) {
            var utilization = 0;

            if(previousSnapshot) {
                var prevTicks = getTotalTicks(previousSnapshot);
                var currTicks = getTotalTicks(currentSnapshot);

                var prevIdle = previousSnapshot.times.idle;
                var currIdle = currentSnapshot.times.idle;

                utilization = (currIdle - prevIdle) / (currTicks - prevTicks);
            }

            return utilization * 100;
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