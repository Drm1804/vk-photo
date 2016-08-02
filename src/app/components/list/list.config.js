(function () {
  'use strict';

  angular.module('vkPhoto')
    .config(config);

  /** @ngInject */
  function config($stateProvider){

    $stateProvider
      .state('auth.list', {
        url: '/list',
        templateUrl: 'app/components/list/list.html'
      })

  }

})();
