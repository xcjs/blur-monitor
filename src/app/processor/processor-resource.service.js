(function() {
   'use strict';

    angular.module('BlurMonitor.processor').service('ProcessorResource', ProcessorResource);

    function ProcessorResource($resource) {
        var Processor = $resource('/api/processor/:id', { id: '@id' }, {
            utilization: {
                method: 'GET',
                isArray: true,
                url: '/api/processor/utilization'
            }
        });

        this.query = Processor.query;
        this.get = Processor.get;
        this.utilization = Processor.utilization;
    }
})();