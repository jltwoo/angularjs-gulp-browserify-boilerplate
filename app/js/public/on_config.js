'use strict';
import configCommon from '../common/on_config';

function OnConfig($stateProvider, $locationProvider,$compileProvider ,$provide, $urlRouterProvider,$translateProvider) {
  'ngInject';
  
  configCommon.apply(this,arguments);

  $stateProvider
  .state('home', {
    url: '/',
    controller: 'HomeCtrl as home',
    templateUrl: 'home.html',
    title: 'Home'
  })
  $urlRouterProvider.otherwise('/');
}

export default OnConfig;