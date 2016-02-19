'use strict';

function MockBEEventService(MockBackEndService, $rootScope) {
  'ngInject';

  const service = {};
  // We don't want to mix with the other client-side events
  const MOCKBACKEND_EVENT_PREFIX = 'MOCKBACKEND_EVT_';

  service.listen = function(eventName, callback, scope){
    var handler = $rootScope.$on(MOCKBACKEND_EVENT_PREFIX+eventName, callback);
    if(scope){
      scope.$on('$destroy', handler);
    }
    // return the unsubscribe function to the client
    return handler;
  }
  service.trigger = function(eventName, data){
    $rootScope.$emit(MOCKBACKEND_EVENT_PREFIX+eventName, data);
  };

  service.init = function() {};

  return service;
}

export default {
  name: 'MockBEEventService',
  fn: MockBEEventService
};
