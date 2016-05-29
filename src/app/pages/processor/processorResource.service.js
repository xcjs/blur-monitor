(function() {
   'use strict';

    angular.module('BlurMonitor.pages.processor').service('ProcessorResource',
    ['$resource', ProcessorResource]);

    function ProcessorResource($resource) {
        var Processor = $resource('/api/processor/:id', { id: '@id' });

        this.query = Processor.query;
        this.get = Processor.get;
    }
})();