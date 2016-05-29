(function () {
    'use strict';

    angular.module('BlurMonitor.pages.processor', [
        'BlurMonitor.constants',
        'chart.js',
        'ngResource'
    ])
        .config(routeConfig, chartJsConfig);

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
                    order: 0
                }
            });
    }

    function chartJsConfig(ChartJsProvider, baConfigProvider) {
        var layoutColors = baConfigProvider.colors;
        // Configure all charts
        ChartJsProvider.setOptions({
            colours: [ layoutColors.primary, layoutColors.danger, layoutColors.warning, layoutColors.success, layoutColors.info, layoutColors.default, layoutColors.primaryDark, layoutColors.successDark, layoutColors.warningLight, layoutColors.successLight, layoutColors.primaryLight],
            responsive: true,
            scaleFontColor: layoutColors.defaultText,
            scaleLineColor: layoutColors.border,
            pointLabelFontColor: layoutColors.defaultText
        });
        // Configure all line charts
        ChartJsProvider.setOptions('Line', {
            datasetFill: false
        });
    }

})();