angular.module('vimeoApp').controller('uploadVideoCtrl', function ($scope, mainService, $state) {

    $scope.uploadVideo = () => {
        mainService.uploadVid($scope.video).then(res => {
            console.log(res);
            $state.go('userVideos');
        })

    }

});
