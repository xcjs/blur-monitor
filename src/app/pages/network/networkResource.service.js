(function() {
    'use strict';

    angular.module('BlurMonitor.pages.network').service('NetworkResource',
        NetworkResource);

    function NetworkResource() {
        var Network = $resource('/api/network');

        this.query = Network.query;
    }
})();