'use strict';
import configCommon from '../common/on_config';

// All on_config must have same signature
function OnConfig($stateProvider, $locationProvider,$compileProvider ,$provide, $urlRouterProvider) {
  'ngInject';
  
  configCommon.apply(this,arguments);

  $stateProvider
  .state('home', {
    url: '/',
    controller: 'HomeCtrl as home',
    templateUrl: 'home.public.html',
    title: 'Home'
  })
  $urlRouterProvider.otherwise('/');
}

export default OnConfig;