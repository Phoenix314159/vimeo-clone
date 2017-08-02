angular.module('vimeoApp').directive('fileUploader', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            let model = $parse(attrs.fileUploader),
                modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
});
