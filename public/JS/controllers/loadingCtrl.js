angular.module('vimeoApp').controller('loadingCtrl', function ($scope, $timeout) {

    $scope.loadB = true;
    $scope.loadG = false;
    $scope.loadR = false;

    $timeout();

    $timeout(() => {
        $scope.loadG = true;
    }, 500);

    $timeout();

    $timeout(() => {
        $scope.loadR = true;
    }, 1000);

    $timeout();

});
