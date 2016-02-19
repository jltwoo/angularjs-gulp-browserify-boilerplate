'use strict';
import configCommon from '../common/on_config';

// All on_config must have same signature
function OnConfig($stateProvider, $locationProvider,$compileProvider ,$provide, $urlRouterProvider) {
  'ngInject';
  
  configCommon.apply(this,arguments);

  $stateProvider
  .state('home', {
    url: '/business',
    controller: 'BusinessHomeCtrl as home',
    templateUrl: 'home.business.html',
    title: 'Business Portal'
  });

  $urlRouterProvider.otherwise('/business');
}

export default OnConfig;