(function () {
  'use strict';

  angular.module('vkPhoto')
    .controller('AlbumController', AlbumController);

  /** @ngInject */
  function AlbumController($stateParams, $user, $vk, $scope, $mdDialog, FileUploader) {
    var vm = this;
    vm.aid = null;
    vm.user = null;
    vm.photoList = null;
    vm.chooseSizeImg = chooseSizeImg;
    vm.showBigImg = showBigImg;
    vm.getPhoto = getPhoto;
    vm.run = run;
    vm.run();

    function showBigImg(ev, item){
      var url = vm.chooseSizeImg(item);
      $mdDialog.show({
        controller: DialogController,
        template: '<img style="width: 100%;" src="{{url}}" alt="">',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals: {
          url: url
        },
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose: true,
        fullscreen: true
      })
    }


    function DialogController(url){
      $scope.url = url;
    }

    function chooseSizeImg(item){
      if(item.src_xxbig){
        return item.src_xxbig
      } else if(item.src_xbig){
        return item.src_xbig
      } else if(item.src){
        return item.src
      }
    }

    function getPhoto(uid, aid){
      $vk.getPhotos(uid, aid)
        .then(function(resp){
          vm.photoList = resp;
          console.log(resp)
        })
    }

    function run() {
      vm.aid = $stateParams.aid;
      $user.isAuth()
        .then(function(resp){
          vm.user = resp;
          vm.getPhoto(vm.user.session.mid, vm.aid);
        });

    }

  }


})();
