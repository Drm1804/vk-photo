(function () {

  /* global VK */
  'use strict';

  // Сервис обертка над VK SDK

  angular.module('vkPhoto')
    .service('$vk', $vk);


  /** @ngInject */

  function $vk($rootScope, $timeout, $q, $state, $const) {

    return {
      login: function(){
        var dfd = $q.defer();
        VK.Auth.login(function(data){
          dfd.resolve(data);
        }, function(data){
          dfd.reject(data);
        });

        return dfd.promise;
      },
      logout: function(){
        var dfd = $q.defer();
        VK.Auth.logout(function(data){
          dfd.resolve(data);

        }, function(data){
          dfd.reject(data);
        });

        return dfd.promise;
      },
      getLoginStatus: function(){

        var dfd = $q.defer();
        $timeout(function(){
          VK.Auth.getLoginStatus(function(data){
            dfd.resolve(data);
          }, function(data){
            dfd.reject(data);
          });
        });


        return dfd.promise;
      }
    }
  }
})();
