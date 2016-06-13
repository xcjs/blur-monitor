(function () {
    'use strict';

    angular.module('BlurMonitor.pages.disks', [
        'BlurMonitor.config',
        'ngResource'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('disks', {
                url: '/disks',
                templateUrl: 'app/pages/disks/disks.html',
                controller: 'DisksController',
                controllerAs: 'vm',
                title: 'Disks',
                sidebarMeta: {
                    icon: 'ion-filing',
                    order: 3
                }
            });
    }
})();