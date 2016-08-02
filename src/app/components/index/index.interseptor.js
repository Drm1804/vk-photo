(function () {
    'use strict';


  // todo сделать перехватчик асинхронных событий, который будет запускать и останавливать анимацию загрузки

  angular.module('vkPhoto')
    .factory('progressBarInterceptor', progressBarInterceptor);

  /** @ngInject */
  function progressBarInterceptor($rootScope){
    var stackRequest = [];

    function chackStack(){
      if(stackRequest.length != 0){
        $rootScope.$emit('navbar:showProgress')
      } else {
        $rootScope.$emit('navbar:hideProgress')

      }
    }
    return{
      request: function(config){
        stackRequest.push('1');
        chackStack();
        return config;
      },
      response: function(response){
        stackRequest.pop();
        chackStack();
        return response;
      }
    }
  }


  angular.module('vkPhoto')
    .config(config);

  /** @ngInject */
  function config($httpProvider){
    return $httpProvider.interceptors.push('progressBarInterceptor')

  }
})();
