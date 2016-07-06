(function() {
    'use strict';

    angular.module('BlurMonitor.pages.network').service('NetworkResource',
        NetworkResource);

    function NetworkResource() {
        var Network = $resource('/api/network');
        var External = $resource('/api/external');
        var Traceroute = $resource('/api/traceroute');

        this.get = Network.get;
        this.getExternal = External.get;
        this.getTraceroute = Traceroute.get;
    }
})();