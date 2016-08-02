(function () {
  'use strict';

  angular.module('vkPhoto')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($user, $state, $const) {
    var vm = this;
    vm.run = run;
    vm.run();


    function run() {
      $user.isAuth()
        .then(function () {
          $state.go($const.defaultState)
        })
    }
  }

})();
