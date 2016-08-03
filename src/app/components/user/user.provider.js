(function () {
  'use strict';

  /* Провайдер работающий с данными пользователя.
   *   - авторизация
   *   - выход
   *   - проверка данных
   *   - хранение данных пользователя
   *
   * */

  angular.module('vkPhoto')
    .provider('$user', $user);


  /** @ngIngect */
  function $user() {


    return {
      $get: function ($q, $timeout, $vk, $rootScope, $state, $const) {
        return {
          _user: {
            session: null
          },
          isAuth: function () {

            // todo перевисать isAuth более красиво
            var _this = this;
            var dfd = $q.defer();

            $timeout(function () {


              if (_this._user.session != null) {
                // Если имеются данные о пользователе возвращаем их
                dfd.resolve(_this._user);
                $rootScope.$emit('user:login', _this._user);
              } else {
                // Запрашиваем информацию о пользователе
                _this.getLoginStatus()
                  .then(
                    function (resp) {
                      _this._user = resp;
                      if(_this._user.session != null){
                        dfd.resolve(resp);
                        $rootScope.$emit('user:login', _this._user);
                      } else {
                        dfd.reject(resp);
                        $rootScope.$emit('user:logout');
                      }

                    },
                    function (resp) {
                      dfd.reject(resp);
                      $rootScope.$emit('user:logout');
                    }
                  );
              }
            });


            return dfd.promise;
          },

          login: function () {
            var _this = this;
            var dfd = $q.defer();
            $vk.login()
              .then(
                function (resp) {
                  dfd.resolve(resp);
                  $state.go($const.defaultState, {reload: true})
                }, function (resp) {
                  dfd.reject(resp);
                }
              );
            return dfd.promise;
          },
          logout: function () {
            var _this = this;
            var dfd = $q.defer();
            $rootScope.$emit('user:logout');
            $vk.logout()
              .then(
                function (resp) {
                  dfd.resolve(resp);
                  _this._user.session = null;
                  $state.go('login');

                }, function (resp) {
                  dfd.reject(resp);
                }
              );
            return dfd.promise;
          },
          getLoginStatus: function () {
            var _this = this;
            var dfd = $q.defer();
            $vk.getLoginStatus()
              .then(
                function (resp) {
                  dfd.resolve(resp);
                }, function (resp) {
                  dfd.reject(resp);
                }
              );
            return dfd.promise;
          }
        }
      }

    }


  }

})();
