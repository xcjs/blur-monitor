(function () {
    'use strict';

    angular.module('BlurMonitor.pages.disks', [
        'BlurMonitor.config',
        'BlurMonitor.disks',
        'BlurMonitor.utilities'
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
                    icon: 'fa fa-hdd-o',
                    order: 3
                }
            });
    }
})();