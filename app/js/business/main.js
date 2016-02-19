'use strict';

import angular from 'angular';

import mainCommon from '../common/main';
import constants from '../common/constants';
import config from './on_config';
import on_run from '../common/on_run';

// angular modules
// browserify will find these modules installed by npm
import './home';

// create and bootstrap application
const requires = [
  'app.business.home'
].concat(mainCommon.requires);


// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', constants);

angular.module('app').config(config);

angular.module('app').run(on_run);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
