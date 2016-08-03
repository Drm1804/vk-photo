(function () {

  /* global VK */
  'use strict';

  // Сервис обертка над VK SDK

  angular.module('vkPhoto')
    .service('$vk', $vk);


  /** @ngInject */

  function $vk($timeout, $q, $http) {

    return {
      login: function(){
        var dfd = $q.defer();
        VK.Auth.login(function(r){
          if(r.session){
            dfd.resolve(r);
          } else {
            dfd.reject(r);
          }
        },  4);

        return dfd.promise;
      },
      logout: function(){
        var dfd = $q.defer();
        VK.Auth.logout(function(r) {
          dfd.resolve(r);
        });

        return dfd.promise;
      },
      getLoginStatus: function(){

        var dfd = $q.defer();
        $timeout(function(){
          VK.Auth.getLoginStatus(function(data){
            dfd.resolve(data);
          });
        });

        return dfd.promise;
      },
      getAlbums: function(){

        var dfd = $q.defer();
        $timeout(function(){

          VK.Api.call('photos.getAlbums', {}, function(r){
            if(r.response){
              dfd.resolve(r.response)
            } else {
              dfd.reject(r)
            }
          });
        });
        return dfd.promise;
      },
      getPhotos: function(uid, aid){

        var dfd = $q.defer();
        $timeout(function(){

          VK.Api.call('photos.get', {owner_id:uid, album_id: aid}, function(r){
            if(r.response){
              dfd.resolve(r.response)
            } else {
              dfd.reject(r)
            }
          });
        });
        return dfd.promise;
      },
      getPhotoUploadServer: function(aid){

        var dfd = $q.defer();
        $timeout(function(){

          VK.Api.call('photos.getUploadServer', {album_id: aid}, function(r){
            if(r.response){
              dfd.resolve(r.response)
            } else {
              dfd.reject(r)
            }
          });
        });
        return dfd.promise;
      },
      photoUpload: function(urlServer, data){
        var dfd = $q.defer();
        $http.post(urlServer, data)
          .then(function(resp){
            dfd.resolve(resp);
          }, function(resp){
            dfd.reject(resp)
          });
        return dfd.promise;
      },
      photoSave: function(aid, server){

        var dfd = $q.defer();
        $timeout(function(){

          VK.Api.call('photos.getUploadServer', {album_id: aid, server: server}, function(r){
            if(r.response){
              dfd.resolve(r.response)
            } else {
              dfd.reject(r)
            }
          });
        });
        return dfd.promise;
      }
    }
  }
})();
