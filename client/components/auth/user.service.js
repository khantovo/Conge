'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    },
    updateInfo:  {
      method: 'POST',
      params: {
        id: 'update'
      }
    }
  });
}

angular.module('congeApp.auth')
  .factory('User', UserResource);

})();
