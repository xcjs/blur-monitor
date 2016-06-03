(function() {
    'use strict';

    angular.module('BlurMonitor.pages.memory').controller('MemoryController', [
        '$interval',
        'refreshInterval',
        'maxSnapshots',
        'MemoryResource',
        MemoryController]);

    function MemoryController($interval, refreshInterval, maxSnapshots, MemoryResource) {
        var vm = this;

        vm.memoryInfo = [];

        vm.chartData = [];
        vm.chartLabels = [];
        vm.chartSeries = [];
        vm.chartOptions = {
            animation: true
        };

        $interval(function() {
            getMemory();
        }, refreshInterval);

        function getMemory() {

        }
    }
})();