(function() {
    'use strict';

    angular.module('BlurMonitor.network').service('BandwidthResource', BandwidthResource);

    function BandwidthResource($window, AuthStorage) {
        var self = this;

        this.get = get;
        this.post = post;
        this.addProgressCallback = addProgressCallback;
        this.addCompleteCallback = addCompleteCallback;

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
            request.setRequestHeader('Authorization', 'Bearer ' + AuthStorage.get());
            request.send();
        }

        function post(payload, contentType) {
            request.open('POST', url);
            request.setRequestHeader('Authorization', 'Bearer ' + AuthStorage.get());
            request.setRequestHeader('Content-Type', contentType);
            request.send(payload);
        }
    }
})();
