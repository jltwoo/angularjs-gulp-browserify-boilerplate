'use strict';

function UserFactory($resource) {
  'ngInject';

  return $resource('/api/v1/user/:userId', 
    { userId: '@id' }, /* maps 'userId' in url to 'id' in object property, used for update/delete */
    {
      /* Retrieves whether the user is authenticated or not*/
      status: {
        method: 'GET',
        url: '/api/v1/user/status'
      },
      authenticate: {
        method: 'POST',
        url: '/auth/login'
      },
      logout:{
        method: 'POST',
        url: '/auth/logout'
      },
      register: {
        method: 'POST',
        url: '/api/v1/user'
      },
      update:{ method: 'PUT' }
    } /* Custom actions */
  );
}
export default {
  name: 'Users',
  fn: UserFactory
};