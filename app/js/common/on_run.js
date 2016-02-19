'use strict';

function OnRun($rootScope, AppSettings, $injector,AuthService) {
  'ngInject';

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.pageTitle = '';

    if ( toState.title ) {
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' \u2014 ';
    }

    $rootScope.pageTitle += AppSettings.appTitle;
  });

// @if MOCK_BACKEND 
  $injector.get('MockBackEndService').init($injector);
// @endif

  // https://github.com/angular-ui/ui-router/issues/1699
  $rootScope.$on('$stateChangeStart', 
    (event, toState, toParams, fromState, fromParams) => {
    AuthService.isLoggedIn()
    .finally(function(){
      $rootScope.$broadcast('onLoginInCheckComplete');
    });
  });
}

export default OnRun;