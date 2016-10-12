'use strict';

angular.module('congeApp')
  .service('Conge', function ($resource) {
    return $resource('/api/conges/:id', {id: '@_id'}, {});
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
