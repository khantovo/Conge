'use strict';

angular.module('congeApp.auth', [
  'congeApp.constants',
  'congeApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
