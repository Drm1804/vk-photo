(function () {
  'use strict';
  angular.module('vkPhoto')
    .controller('NavbarController', NavbarController);


  /** @ngInject */
  function NavbarController($rootScope, $mdSidenav) {

    var vm = this;

    vm.isUser = true;
    vm.showProgress = true;

    vm.toggleMenu = toggleMenu;
    vm.run = run;
    vm.run();



    function toggleMenu(navID) {
      $mdSidenav(navID)
        .toggle()
    }


    function run() {

      $rootScope.$on('navbar:showProgress', function (ev, data) {
        vm.showProgress = true;
      });

      $rootScope.$on('navbar:hideProgress', function (ev, data) {
        vm.showProgress = false;
      });

    }


  }

})();
