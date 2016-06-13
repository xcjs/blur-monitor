(function () {
    'use strict';

    angular.module('BlurMonitor.config', [
        'BlurAdmin.theme',
        'chart.js'
    ])
        .config(chartJsConfig);
    
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