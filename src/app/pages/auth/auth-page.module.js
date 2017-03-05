(function () {
    'use strict';

    angular.module('BlurMonitor.pages.auth', [
        'BlurMonitor.auth',
        'LocalStorageModule'
    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('auth', {
                url: '/auth',
                templateUrl: 'app/pages/auth/auth.html',
                controller: 'AuthController',
                controllerAs: 'vm',
                title: 'Authentication'
            });
    }
})();
