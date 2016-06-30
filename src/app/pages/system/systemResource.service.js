(function() {
    'use strict';

    angular.module('BlurMonitor.pages.system').service('SystemResource',
        ['$resource', SystemResource]);

    function SystemResource($resource) {
        var System = $resource('/api/system');

        this.get = System.get;
    }
})();