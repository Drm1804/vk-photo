(function () {
  'use strict';

  angular.module('vkPhoto')
    .config(config);

  /** @ngInject */
  function config($urlRouterProvider){

    $urlRouterProvider.otherwise('/');

  }

})();
