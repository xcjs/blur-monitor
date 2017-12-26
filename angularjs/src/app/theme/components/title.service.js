(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .service('Title',
            Title);

    /** @ngInject */
    function Title($window) {
        this.set = set;

        function set(title) {
            $window.document.title = title;
        }
    }

})();