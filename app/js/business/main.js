'use strict';

import angular from 'angular';

import mainCommon from '../common/main';

// angular modules
// browserify will find these modules installed by npm
import './home';

// create and bootstrap application
const requires = [
  'app.business.home'
].concat(mainCommon.requires);


// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', require('../common/constants'));

angular.module('app').config(require('./on_config'));

angular.module('app').run(require('../common/on_run'));

angular.bootstrap(document, ['app'], {
  strictDi: true
});
