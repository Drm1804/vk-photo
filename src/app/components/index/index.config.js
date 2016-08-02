(function () {
  'use strict';

  angular.module('vkPhoto')
    .config(config);

  /** @ngInject */
  function config($urlRouterProvider, $stateProvider){

    $urlRouterProvider.otherwise('/list');

    $stateProvider
      .state('auth', {
        abstract: true,
        template: '<div ui-view=""></div>',
        resolve: {
          auth: function ($q, $user, $rootScope, $state) {

            var dfd = $q.defer();

            $user.isAuth()
              .then(
                function () {
                  dfd.resolve();
                },
                function () {
                  $state.go('login');
                });

            return dfd.promise;
          }
        }
      });
  }

})();
