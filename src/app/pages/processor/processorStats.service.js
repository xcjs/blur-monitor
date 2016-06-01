(function() {
    'use strict';

    angular.module('BlurMonitor.pages.processor').service('ProcessorStats',
        [ProcessorStats]);

    function ProcessorStats() {
        this.getUtilization = getUtilization;

        this.maxClock = 0;

        function getUtilization(previousSnapshot, currentSnapshot) {
            var utilization = 0;

            if(this.maxClock < currentSnapshot.speed) {
                this.maxClock = currentSnapshot.speed;
            }

            if(previousSnapshot) {
                var prevTicks = getTotalTicks(previousSnapshot);
                var currTicks = getTotalTicks(currentSnapshot);

                var prevIdle = previousSnapshot.times.idle;
                var currIdle = currentSnapshot.times.idle;

                var clockRatio = currentSnapshot.speed / this.maxClock;

                utilization = (currIdle - prevIdle) / (currTicks - prevTicks) * clockRatio;
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