'use strict';

/**
* uploadPhoto
*
* Defines a directive to upload profile picture
*/
angular.module('wishlistApp')

.directive('uploadPhoto', function ($parse) {
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {

            // We get the setter for the variable supplied on the
            // uploadPhoto attribute
            var model = $parse(attrs.uploadPhoto);
            var setter = model.assign;

            // When the user selects a file, we will update the
            // model to set the image value using the setter we
            // previously got.
            elem.bind('change', function() {
                $scope.$apply(function () {

                    // Using FileReader, we will convert the image
                    // to Base64 encoding to save it on local storage
                    var reader = new FileReader();

                    reader.onload = function() {
                      setter($scope, reader.result);
                    };

                    reader.readAsDataURL(elem[0].files[0]);
                });
            });
        }
    };
});
