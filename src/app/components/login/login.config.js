(function () {
    'use strict';

  angular.module('vkPhoto')
    .config(config);


  /** @ngInject */
  function config($stateProvider){
    $stateProvider
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'app/components/login/login.html'
      })
  }
})();
