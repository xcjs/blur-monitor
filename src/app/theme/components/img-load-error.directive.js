/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .directive('imgLoadError', imgLoadError);

    /** @ngInject */
    function imgLoadError() {
        return {
            restrict: 'A',
            link: link
        };
    }

    function link(scope, element, attr) {
        element.on('error', function() {
            element.remove();
        });
    }
})();