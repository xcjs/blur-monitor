(function () {
    'use strict';

    angular.module('BlurMonitor.auth', [
        'ngResource',
        'LocalStorageModule'
    ]).config(config);

    function config($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }
})();