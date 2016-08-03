(function () {
  'use strict';

  angular.module('vkPhoto')
    .config(config);

  /** @ngInject */
  function config($stateProvider){
    $stateProvider
      .state('auth.album', {
        url: '/album?aid',
        templateUrl: 'app/components/album/album.html'
      })
  }

})();
