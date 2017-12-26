(function() {
    'use strict';

    angular.module('BlurMonitor.processor').service('ProcessorUtilizationCalculator', ProcessorUtilizationCalculator);

    function ProcessorUtilizationCalculator() {
        this.getUtilization = getUtilization;

        function getUtilization(previousSnapshot, currentSnapshot) {
            var idleness = 0;
            var formattedUtilization;

            if(previousSnapshot) {
                var prevTicks = getTotalTicks(previousSnapshot);
                var currTicks = getTotalTicks(currentSnapshot);

                var prevIdle = previousSnapshot.times.idle;
                var currIdle = currentSnapshot.times.idle;

                var idle = currIdle - prevIdle;
                var ticks = currTicks - prevTicks;

                if(ticks > 0 && idle > 0) {
                    idleness = idle / ticks;
                } else {
                    idleness = 0;
                }
            }

            formattedUtilization = (100 - (idleness * 100)).toFixed(2);
            
            return formattedUtilization;
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
