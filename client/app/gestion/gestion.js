'use strict';

angular.module('congeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('gestion', {
        url: '/gestion',
        template: '<gestion></gestion>'
      });
  });
