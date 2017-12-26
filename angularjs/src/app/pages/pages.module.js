/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',
    'BlurMonitor.pages.auth',
    'BlurMonitor.pages.dashboard',
    'BlurMonitor.pages.processor',
    'BlurMonitor.pages.memory',
    'BlurMonitor.pages.disks',
    'BlurMonitor.pages.network',
    'BlurMonitor.pages.processes'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise('/dashboard');
  }

})();
