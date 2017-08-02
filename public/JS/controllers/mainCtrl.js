angular.module('vimeoApp').controller('mainCtrl', function ($scope, mainService, $state) {

    $scope.login = () => {
        mainService.login().then(res => {
            $scope.data = res.data;
        })
    }
    $scope.login();

    $scope.playVideo = (videoLink, uri, video) => {
        mainService.clickedVideo(videoLink);
        mainService.transferVideo(video);
        let id = uri.replace(/\D/g, '');
        mainService.getId(id);
        $state.go('playvideo');
    }

    mainService.getVideosByChannel('staffpicks').then(res => {
        $scope.staffpicks = res.data.data;
    })
    mainService.getVideosByChannel('documentary').then(res => {
        $scope.documentary = res.data.data;
    })
});
