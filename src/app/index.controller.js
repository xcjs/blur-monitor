(function() {
    'use strict';

    angular.module('BlurMonitor').controller('IndexController', IndexController);

    function IndexController(AuthStorage) {
        var vm = this;

        vm.isAuthenticated = AuthStorage.get;
    }
})();