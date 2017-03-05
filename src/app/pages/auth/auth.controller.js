(function() {
    'use strict';

    angular.module('BlurMonitor.pages.auth').controller('AuthController', AuthController);

    function AuthController($state, AuthResource, AuthStorage) {
        var vm = this;

        vm.error = null;

        vm.authenticate = authenticate;

        function authenticate() {
            vm.error = null;

            AuthResource.authenticate({ username: vm.username, password: vm.password}, function(token) {
                AuthStorage.set(token);
                $state.go('dashboard');
            }, function() {
                vm.error = 'Authentication failed.';
            });
        }
    }
})();