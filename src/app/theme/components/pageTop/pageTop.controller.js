(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('PageTopController',
            PageTopController);

    /** @ngInject */
    function PageTopController($scope, Title, SystemResource) {
        $scope.system = null;

        SystemResource.get(function(system) {
            $scope.system = system;

            Title.set(system.host.toUpperCase());
        });
    }

})();