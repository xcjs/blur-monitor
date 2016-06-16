(function () {
    'use strict';

    angular.module('BlurMonitor.pages.processor', [
        'BlurMonitor.config',
        'BlurMonitor.utilities',
        'ngResource'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('processor', {
                url: '/processor',
                templateUrl: 'app/pages/processor/processor.html',
                controller: 'ProcessorController',
                controllerAs: 'vm',
                title: 'Processor',
                sidebarMeta: {
                    icon: 'ion-speedometer',
                    order: 1
                }
            });
    }
})();
