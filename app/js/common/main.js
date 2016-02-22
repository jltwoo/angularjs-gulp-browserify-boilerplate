'use strict';

import angular from 'angular';

// angular modules
// browserify will find these modules installed by npm
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'angular-animate';
import 'angular-sanitize';
import 'angular-touch';
import 'angular-material';
import 'angular-carousel';
import 'angular-scroll';
import 'ng-sortable';

//import '../../../bower_components/angular-material/angular-material.js';

import '../templates';
import './user';
import './util';

// @if MOCK_BACKEND 
import '../common/mockBackEnd';
// @endif

// create and bootstrap application
const requires = [
  'ui.router',
  'ui.bootstrap',
  'ngMaterial',
  'ngAnimate',
  'duScroll',
  'templates',
  'angular-carousel',
  'as.sortable',
  'ngTouch',
// @if MOCK_BACKEND 
  'app.mockbackend',
// @endif
  'app.user',
  'app.util'
];


export default {
  requires: requires
};

