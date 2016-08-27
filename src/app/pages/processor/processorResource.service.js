(function() {
   'use strict';

    angular.module('BlurMonitor.pages.processor').service('ProcessorResource',
    ['$resource', ProcessorResource]);

    function ProcessorResource($resource) {
        var Processor = $resource('/api/processor/:id', { id: '@id' });
        var ProcessorUtilization = $resource('api/processor/utilization');

        this.query = Processor.query;
        this.get = Processor.get;
        this.getUtilization = ProcessorUtilization.query;
    }
})();