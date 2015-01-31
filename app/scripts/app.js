'use strict';

/**
 * @ngdoc overview
 * @name wishlistApp
 * @description
 * # wishlistApp
 *
 * Main module of the application.
 */
angular
  .module('wishlistApp', [
    'ngRoute',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider, localStorageServiceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      localStorageServiceProvider.setPrefix('wishlistApp');
  });
