(function () {
    'use strict';

    angular.module('BlurMonitor.pages.processes', [
        'BlurMonitor.config',
        'ngResource'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('processes', {
                url: '/processes',
                templateUrl: 'app/pages/processes/processes.html',
                controller: 'ProcessesController',
                controllerAs: 'vm',
                title: 'Processes',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 5
                }
            });
    }
})();
/**
 * Created by diaruemnus on 7/8/16.
 */
