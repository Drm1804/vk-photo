(function () {
  'use strict';

  angular.module('vkPhoto')
    .controller('ListPhotoController', ListPhotoController);

  /** @ngInject */

  function ListPhotoController($vk, $state) {
    var vm = this;
    vm.albumList = [];
    vm.goInAlbum = goInAlbum;
    vm.getList = getList;
    vm.run = run;
    vm.run();


    function goInAlbum(id) {
      $state.go('auth.album', {aid: id});
    }

    function getList() {
      $vk.getAlbums()
        .then(function (resp) {
          vm.albumList = resp;
          console.log(resp)
        })
    }

    function run() {
      vm.getList();
    }
  }

})();
