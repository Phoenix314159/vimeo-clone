angular.module('vimeoApp').controller('playVideo', function ($scope, mainService, $state) {
    let stripDuplicates = a => [...new Set(a)];
    $scope.showButton = true;
    $scope.video = mainService.video;
    mainService.getVideosByChannel('staffpicks').then(res => {
        $scope.arr2 = res.data.data;
    });
    $scope.getChannelVideos = () => {
        mainService.getVideosByChannel('music').then(res => {
            $scope.arr = res.data.data;
            $scope.arr.unshift(mainService.arr3[0]);
            $scope.arr = stripDuplicates($scope.arr);
            $scope.playVideo = (videoLink, uri, video) => {
                mainService.clickedVideo(videoLink);
                let id = uri.replace(/\D/g, '');
                mainService.getId(id);
                $scope.video = mainService.arr2[mainService.arr2.length - 1];
                document.querySelector(".video-window").innerHTML = $scope.video;
                $scope.getVideo();
                $scope.getAllComments();
                $scope.arr.unshift(video);
                $scope.arr = stripDuplicates($scope.arr);
            };
            $scope.showMore = () => {
                $scope.showButton = false;
                for (let i = 0; i < $scope.arr2.length; i++) {
                    $scope.arr.push($scope.arr2[i]);
                };
            };
        });
    };
    $scope.getChannelVideos();
    $scope.getVideo = () => {
        let id = mainService.arr[0];
        mainService.getVideoById(id).then(res => {
            $scope.media = res.data;
            console.log('$scope.media' , $scope.media)
            let beforeDate = res.data.created_time,
                date = beforeDate => {
                    let newD = beforeDate.slice(0, 10),
                        splitDate = newD.split(''),
                        noDash = splitDate.filter(numb => {
                            return numb !== '-';
                        });
                    let forMoment = noDash.join("");
                    $scope.momentTime = moment(forMoment, "YYYYMMDD").fromNow();
                };
            date(beforeDate);
            $scope.dateTest = moment("20170601", "YYYYMMDD").fromNow();
        });
    };
    $scope.getVideo();
    $scope.getAllComments = () => {
        let id = mainService.arr[0];
        mainService.getComments(id).then(res => {
            $scope.comments = res.data.data;

        });
    }
    $scope.getAllComments();

    document.querySelector(".video-window").innerHTML = $scope.video;
});
