(function() {
    'use strict';

    angular.module('BlurMonitor.assets').service('AssetsResource',
        ['$resource', AssetsResource]);

    function AssetsResource($resource) {
        var AppAssets = $resource('/api/assets/apps');
        var DistroAssets = $resource('/api/assets/distros');

        this.getApps = AppAssets.query;
        this.getDistros = DistroAssets.query;
    }
})();