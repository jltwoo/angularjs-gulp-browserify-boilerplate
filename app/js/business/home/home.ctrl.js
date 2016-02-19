'use strict';

function BusinessHomeCtrl($scope) {
  'ngInject';

  // ViewModel
  this.welcomeText = 'Hello World! This is homepage for business users';
  
}

export default {
  name: 'BusinessHomeCtrl',
  fn: BusinessHomeCtrl
};
