(function() {
   'use strict';

    angular.module('BlurMonitor.processor').service('ProcessorResource', ProcessorResource);

    function ProcessorResource($resource) {
        var processor = $resource('/api/processor/:id', { id: '@id' }, {
            utilization: {
                method: 'GET',
                isArray: true,
                url: '/api/processor/utilization'
            }
        });

        this.query = processor.query;
        this.get = processor.get;
        this.utilization = processor.utilization;
    }
})();