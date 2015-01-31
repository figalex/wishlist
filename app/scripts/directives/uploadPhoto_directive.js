'use strict';

/**
* uploadPhoto Module
*
* Defines a directive to upload profile picture
*/
angular.module('uploadPhoto', [])

.directive('uploadPhoto', function ($parse) {
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {

            var model = $parse(attrs.uploadPhoto);
            var setter = model.assign;

            elem.bind('change', function() {
                $scope.$apply(function () {
                    debugger;

                    var reader = new FileReader();

                    reader.onload = function() {
                      debugger;
                      setter($scope, reader.result);
                    };

                    reader.readAsDataURL(elem[0].files[0]);
                    //setter($scope, elem[0].files[0]);
                });
            });
        }
    };
});
