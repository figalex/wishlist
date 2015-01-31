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
    'uploadPhoto'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
