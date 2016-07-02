(function() {
    'use strict';

    angular.module('BlurMonitor.pages.network').service('BandwidthResource',
        ['$window', BandwidthResource]);

    function BandwidthResource($window) {
        var self = this;

        this.addProgressCallback = addProgressCallback;
        this.addCompleteCallback = addCompleteCallback;
        this.get = get;
        this.post = post;

        var request = new $window.XMLHttpRequest();
        var url = '/api/bandwidth';

        this.response = null;

        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE) {
                self.response = request.responseText;
            }
        }

        function addProgressCallback(callback) {
            request.addEventListener('progress', callback);
            request.upload.addEventListener('progress', callback)
        }

        function addCompleteCallback(callback) {
            request.addEventListener('load', callback);
            request.upload.addEventListener('load', callback);
        }

        function get() {
            request.open('GET', url);
            request.send();
        }

        function post(payload, contentType) {
            request.open('POST', url);
            request.setRequestHeader('Content-Type', contentType);
            request.send(payload);
        }
    }
})();