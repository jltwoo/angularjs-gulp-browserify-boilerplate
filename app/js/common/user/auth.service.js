'use strict';

function AuthService($http, $q, Users, $window, $rootScope) {
  'ngInject';

  const service = {
    user: null // current user's object
  };

  service.isLoggedIn = function(){
    var deferred = $q.defer();
    Users.status().$promise
    .then((data)=>{
      service.user = data.user;
      $rootScope.$broadcast('EVENT_LOGIN_STATUS_CHANGED',$rootScope._isLoggedIn);
      deferred.resolve();
    }.catch((err)=>{ deferred.reject(err); });
    return deferred.promise;
  }
  service.logout = function(){
    Users.logout().$promise
    .finally(function(){
      $window.location.reload();
    })
  }

  service.loginWithUsernameEmail = function(param){
    var deferred = $q.defer();
    Users.authenticate({
      username:param.usernameOrEmail,
      password:param.password,
      hpaddress: param.hpaddress
    }).$promise
    .then((data) => { deferred.resolve(data); })
    .catch((data)=>{ deferred.reject(data); });
    return deferred.promise;
  };
  service.registerWithUsernameEmail = function(param){
    var deferred = $q.defer();
    Users.register({
      firstname:param.firstname,
      lastname:param.lastname,
      username:param.username,
      email:param.email,
      password:param.password,
      hpaddress: param.hpaddress
    }).$promise
    .then((data)=>{ deferred.resolve(data); })
    .catch((data)=>{ deferred.reject(data,status); });
    return deferred.promise;
  };

  return service;

}

export default {
  name: 'AuthService',
  fn: AuthService
};