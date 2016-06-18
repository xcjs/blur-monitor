(function () {
    'use strict';

    angular.module('BlurMonitor.pages.bandwidth', [
        'BlurMonitor.config',
        'ngResource'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('bandwidth', {
                url: '/bandwidth',
                templateUrl: 'app/pages/bandwidth/bandwidth.html',
                controller: 'BandwidthController',
                controllerAs: 'vm',
                title: 'Bandwidth',
                sidebarMeta: {
                    icon: 'ion-arrow-swap',
                    order: 4
                }
            });
    }
})();
