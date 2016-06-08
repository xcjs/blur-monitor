(function () {
    'use strict';

    angular.module('BlurMonitor.pages.memory', [
        'BlurMonitor.config',
        'ngResource'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('memory', {
                url: '/memory',
                templateUrl: 'app/pages/memory/memory.html',
                controller: 'MemoryController',
                controllerAs: 'vm',
                title: 'Memory',
                sidebarMeta: {
                    icon: 'ion-ios-pie',
                    order: 2
                }
            });
    }
})();