'use strict';

/**
* resetOnSubmit
*
* Defines a directive to reset a form after submitting the form.
* This is just to reset the file input when an item is added.
*/
angular.module('wishlistApp')

.directive('resetOnEvent', function () {
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {

            $scope.$on('$ResetElement', function () {
                elem.val(null);
            });
        }
    };
});
