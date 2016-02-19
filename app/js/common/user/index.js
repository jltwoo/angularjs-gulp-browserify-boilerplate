'use strict';

/*
  This files loads all the directives/filters/services 
  within the same directory to modularize the folder structure
*/

const moduleName = 'app.user';

import angular from 'angular';
const bulk = require('bulk-require');

// -------------------------------------------------
// Add any dependencies this angular module requires
import 'angular-resource'; // needed for factories
const dependencies = ['ngResource']; 
// -------------------------------------------------

const components = {
  service : bulk(__dirname,   ['./**/*.service.js']),
  factory : bulk(__dirname,   ['./**/*.factory.js']),
  controller : bulk(__dirname,['./**/*.ctrl.js']),
  directive : bulk(__dirname, ['./**/*.directive.js']),
  filter : bulk(__dirname,    ['./**/*.filter.js'])
};

const appModule = angular.module(moduleName,dependencies);

Object.keys(components).forEach((component) => {
  Object.keys(components[component]).forEach((file) => {
    let fileModule = components[component][file];
    if(Array.isArray(fileModule)){
    	for (var i = 0; i < fileModule.length; i++) {
    		appModule[component](fileModule[i].name,fileModule[i].fn);
    	};
    } else {
    	appModule[component](fileModule.name, fileModule.fn);
    }
  });
});

export default appModule;