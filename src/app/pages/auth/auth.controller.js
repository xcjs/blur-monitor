(function() {
    'use strict';

    angular.module('BlurMonitor.pages.auth').controller('AuthController', AuthController);

    function AuthController($scope, AuthResource) {
        var vm = this;

        vm.error = null;

        vm.authenticate = authenticate;

        function authenticate() {
            vm.error = null;

            AuthResource.authenticate({ username: vm.username, password: vm.password}, function() {

            }, function() {
                vm.error = 'Authentication failed.';
            });
        }
    }
})();