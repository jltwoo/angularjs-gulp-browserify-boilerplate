// Copyright 2016 Jeffrey Woo 
// All Rights Reserved.

// This is a core module that loads up all the mock data backends 
// for testing purposes and early demo phase (when no server support)

'use strict';

import angular from 'angular';
import 'angular-mocks';
import 'angular-cookies';

const moduleName = 'app.mockbackend';
const bulk = require('bulk-require');

const dependencies = ['ngMockE2E','ngCookies']; 

const appModule = angular.module(moduleName,dependencies);
const components = bulk(__dirname, ['./**/*.mock.js']);

var MockServices = [];

// This iterates through the current directory and creates MockBackEnds submodules
Object.keys(components).forEach((key) => {
  var item = components[key];
  MockServices.push(item.name);
  appModule.service(item.name,item.fn);
});

function MockBackEndService(AppSettings,$httpBackend,$cookies,$injector) {
  'ngInject';

  const service = {};
  
  service.model = {};
  if (typeof(Storage) !== "undefined") {
      // Retrieve
    service.model = JSON.parse(localStorage.getItem(AppSettings.mockBackEndModel)) || {};
  } else {
    console.log("Sorry, your browser does not support Web Storage...");
  }    
  service.generateUUID = function(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now();; //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  };

  service.model.save = function(){
    // Check browser support
    if (typeof(Storage) !== "undefined") {
      // Save
      localStorage.setItem(AppSettings.mockBackEndModel, JSON.stringify(service.model));
    }
  }

  service.init = function() {

    for (var i = 0; i < MockServices.length; i++) {
      $injector.get(MockServices[i]).init();
    };
  };

  return service;

}

appModule.service('MockBackEndService', MockBackEndService);


export default appModule;