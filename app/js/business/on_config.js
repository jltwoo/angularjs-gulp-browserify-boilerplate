'use strict';
import configCommon from '../common/on_config';

function OnConfig($stateProvider, $urlRouterProvider) {
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