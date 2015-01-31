'use strict';

/**
 * @ngdoc function
 * @name wishlistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wishlistApp
 */
angular.module('wishlistApp')
  .controller('MainCtrl', function ($scope, $window, localStorageService) {
    
    var _this = this;

    // Will retrieve the wishlist model stored on local storage
    // and set it to the scope wishlist
    this.updateScopeWithStoredModel = function () {

      var storedWishlist = localStorageService.get('wishlist');

      if (storedWishlist) {
        $scope.wishlist = storedWishlist;
      }

      $scope.model.itemsToDisplay = $scope.wishlist.items;
    };

    // Will update the wishlist object saved on local storage
    // with the modified $scope.wishlist object.
    this.saveWishlistModel = function () {
      localStorageService.set('wishlist', $scope.wishlist);
    };


    //Filter names constants
    $scope.WISHLIST_ITEMS = 0;
    $scope.BOUGHT_ITEMS = 1;

    // This object properties help us to control
    // UI stuff like hide and show elements.
    $scope.model = {
      showBoughtItems: false,
      itemsToDisplay: [],
      showSetBudget: false,
      currentListFilter: $scope.WISHLIST_ITEMS,
      searchQuery: ''
    };

    // This is the wishlist model that will keep
    // track of changes and this is what will be saved
    // on local storage.
    $scope.wishlist = {
      budget: null,
      moneySpent: 0,
      toSpend: null,
      boughtItems: [],
      items:[]
    };

    // When the controller is loaded we want to 
    // retrieve what is stored and update the $scope.
    this.updateScopeWithStoredModel();

    // Adds a new item to the wishlist
    $scope.addNewItem = function () {

      // If new item form is invalid (required fields are empty or non numeric values on price field)
      // the item will not be added.
      if (this.newItemForm.$invalid) {
        // Using alert just for simplicity, not that I use to do this kind of stuff.
        return $window.alert('Item name, description and price are required.');
      }

      //$scope.newItem holds all values typed in the form.

      // Assign current date as last modified date
      this.newItem.lastModifiedDate = new Date();

      //Insert new item to wishlist.items array
      this.wishlist.items.push(this.newItem);

      //This will clear the form.
      this.newItem = null;

      //Update the wishlist model on local storage
      _this.saveWishlistModel();

      //Notify the resetOnEvent directive that it should reset the element.
      $scope.$broadcast('$ResetElement');
    };


    // Marks as bought an item on the wishlist
    $scope.markAsBought = function (itemIndex) {

      // Get the item that user wants to mark as bought
      var boughtItem = this.wishlist.items[itemIndex];
      var totalSpent;

      // If there's a budget set, we have to check if buying this item
      // will not exceed to set budget.
      if (this.wishlist.budget) {
          totalSpent = this.wishlist.moneySpent + boughtItem.price;

          if (totalSpent > this.wishlist.budget) {
            return $window.alert('Buying this item will exceed your budget.');
          }

          // If there's no problem buying this item,
          // update the remaining amount to spend.
          this.wishlist.toSpend -= boughtItem.price;
      }

      // Add the bought item price to the moneySpent
      this.wishlist.moneySpent += boughtItem.price;

      // Remove the bought item from wishlist items
      this.wishlist.items.splice(itemIndex, 1);

      // Add item to the bought items list.
      this.wishlist.boughtItems.push(boughtItem);

      // Update model stored on local storage.
      _this.saveWishlistModel();
    };

    // Sets a new budget for the wishlist
    $scope.setBudget = function () {

      // We start fresh, no money spent and the whole budget to spend.
      this.wishlist.budget = this.wishlist.toSpend = this.model.budget;
      this.wishlist.moneySpent = 0;

      // Hide set budget input
      this.model.showSetBudget = false;
      this.model.budget = null;

      // Update model stored on local storage.
      _this.saveWishlistModel();
    };

    // This will switch between showing wishlist items and bought items
    $scope.switchFilter = function (filter) {

      // Indicate which filter is active
      this.model.currentListFilter = filter;

      // Set the correct items to display on list.
      if (filter === this.WISHLIST_ITEMS) {
        this.model.itemsToDisplay = this.wishlist.items;
      }
      else {
        this.model.itemsToDisplay = this.wishlist.boughtItems;
      }
    };

    //This will edit an item on the wishlist
    $scope.editItem = function (itemIndex) {

      // Get the item that user wants to edit
      var itemToEdit = this.wishlist.items[itemIndex];

      // $scope.editItem will hold the values for the item
      // the user is editing
      itemToEdit = $scope.editItem;
      itemToEdit.lastModifiedDate = new Date();

      _this.saveWishlistModel();
    };
  });
