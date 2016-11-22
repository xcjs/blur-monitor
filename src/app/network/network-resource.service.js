(function() {
    'use strict';

    angular.module('BlurMonitor.network').service('NetworkResource', NetworkResource);

    function NetworkResource($resource) {
        var Network = $resource('/api/network');
        var External = $resource('/api/network/external');
        var Traceroute = $resource('/api/network/traceroute');

        this.get = Network.get;
        this.getExternal = External.get;
        this.getTraceroute = Traceroute.get;
    }
})();
