angular.module('vimeoApp').controller('searchCtrl', function ($scope, mainService, $state) {

    let getVideos = () => {
        $scope.videos = mainService.videoData;
    };
    getVideos();

    $scope.getVideoID = id => {
        mainService.getId(id);
    };
    $scope.playVideo = (videoLink, uri, i) => {
        mainService.clickedVideo(videoLink);
        let id = uri.replace(/\D/g, '');
        mainService.getId(id);
        mainService.transferVideo($scope.videos[i]);
        $state.go('playvideo');

    };
    $scope.page = num => {
        mainService.searchVideos(num, mainService.query).then(res => {
            $scope.videos = res.data.data;
            console.log($scope.videos);
        });
    };
    // $scope.addToWatchLaterList = () => {
    //     mainService.getVideoById
    //     mainService.addToWatchLater(video, id).then(res => {
    //         console.log(res);
    //     });
    // };
});
