angular.module('vimeoApp').directive('commentsDir', function () {
    return {
        restrict: "AE",
        templateUrl: "./views/commentsDir.html",
        controller: 'commentsCtrl'
    }
});
