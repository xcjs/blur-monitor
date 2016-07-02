(function () {
    'use strict';

    angular.module('BlurMonitor.pages.dashboard', [
        'angularMoment',
        'BlurMonitor.config',
        'BlurMonitor.pages.system'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/pages/blurmonitor-dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm',
                title: 'Dashboard',
                sidebarMeta: {
                    icon: 'ion-home',
                    order: 0
                }
            });
    }
})();
