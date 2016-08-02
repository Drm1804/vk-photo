(function () {
  'use strict';
  angular.module('vkPhoto')
    .controller('NavbarController', NavbarController);


  /** @ngInject */
  function NavbarController($rootScope, $mdSidenav, $user, $const, $state) {

    var vm = this;

    vm.isUser = true;
    vm.showProgress = false;

    vm.toggleMenu = toggleMenu;
    vm.logout = logout;
    vm.login = login;
    vm.run = run;
    vm.run();


    function login() {
      $user.login();
    }

    function logout() {
      $user.logout();
    }


    function toggleMenu(navID) {
      $mdSidenav(navID)
        .toggle()
    }


    function run() {

      $rootScope.$on('navbar:showProgress', function () {
        vm.showProgress = true;
      });

      $rootScope.$on('navbar:hideProgress', function () {
        vm.showProgress = false;
      });

      $rootScope.$on('user:logout', function () {
        vm.isUser = false;

      });

      $rootScope.$on('user:login', function () {
        vm.isUser = true;
      });

      $user.isAuth()
    }


  }

})();
