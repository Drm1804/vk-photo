(function () {
  'use strict';

  angular.module('vkPhoto')
    .controller('ListPhotoController', ListPhotoController);

  /** @ngInject */

  function ListPhotoController($vk) {
    var vm = this;
    vm.albumList = [];
    vm.goInAlbum = goInAlbum;
    vm.getList = getList;
    vm.run = run;
    vm.run();


    function goInAlbum(id) {
      // todo сделать переход в альбом, когда будет готов соответствующий стейт
      console.log(id);
      // $state.go();
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
