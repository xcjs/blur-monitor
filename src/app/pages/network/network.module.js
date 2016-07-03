(function () {
    'use strict';

    angular.module('BlurMonitor.pages.network', [
        'BlurMonitor.config',
        'ngResource'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('bandwidth', {
                url: '/network',
                templateUrl: 'app/pages/network/network.html',
                controller: 'NetworkController',
                controllerAs: 'vm',
                title: 'Network',
                sidebarMeta: {
                    icon: 'ion-arrow-swap',
                    order: 4
                }
            });
    }
})();
