(function() {
    'use strict';

    angular.module('BlurMonitor.network').service('NetworkResource', NetworkResource);

    function NetworkResource($resource) {
        var resource = getResource();

        this.get = resource.get;
        this.getBandwidth = resource.getBandwidth;
        this.getExternal = resource.getExternal;
        this.getTraceroute = resource.getTraceroute;

        function getResource() {
            var url = '/api/network';

            var actions = {
                getBandwidth: {
                    url: url + '/bandwidth',
                    method: 'GET'
                },
                getExternal: {
                    url: url + '/external',
                    method: 'GET'
                },
                getTraceroute: {
                    url: url + '/traceroute',
                    method: 'GET'
                }
            };

            return $resource(url, null, actions);
        }
    }
})();
