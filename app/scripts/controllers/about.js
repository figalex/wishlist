'use strict';

/**
 * @ngdoc function
 * @name wishlistApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wishlistApp
 */
angular.module('wishlistApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
