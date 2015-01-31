'use strict';

/**
 * @ngdoc function
 * @name wishlistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wishlistApp
 */
angular.module('wishlistApp')
  .controller('MainCtrl', function ($scope, $window) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.model = {
      showBoughtItems: false,
      itemsToDisplay: []
    };

    $scope.wishlist = {
      budget: 3000,
      moneySpent: 2000,
      toSpend: 1000,
      boughtItems: [],
      items:[]
    };


    $scope.$watch('model.showBoughtItems', function (newVal, oldVal) {
      if (newVal === undefined) return;

      if (newVal) {
        $scope.model.itemsToDisplay = $scope.wishlist.boughtItems;
      }
      else {
        $scope.model.itemsToDisplay = $scope.wishlist.items;
      }
    });


    $scope.addNewItem = function () {

      if (this.newItemForm.$invalid) {
        return $window.alert('Item name, description and price are required.');
      }

      this.wishlist.items.push(this.newItem);
      this.newItem = null;
    };


    $scope.markAsBought = function (itemIndex) {

      var boughtItem = this.wishlist.items.splice(itemIndex, 1);

      this.wishlist.boughtItems.push(boughtItem[0]);
    };
  });
