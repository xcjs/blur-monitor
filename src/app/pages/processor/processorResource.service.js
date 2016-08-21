(function() {
   'use strict';

    angular.module('BlurMonitor.pages.processor').service('ProcessorResource',
    ['$resource', ProcessorResource]);

    function ProcessorResource($resource) {
        var Processor = $resource('/api/processor/:id', { id: '@id' });
        var ProcessorLoadAverage = $resource('api/processor/utilization');

        this.query = Processor.query;
        this.get = Processor.get;
        this.getLoadAvg = ProcessorLoadAverage.query;
    }
})();