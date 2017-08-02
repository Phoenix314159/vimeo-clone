angular.module('vimeoApp').service('mainService', function ($http) {

    let vm = this;
    vm.videoData = '';
    vm.video = '';
    vm.arr = [];
    vm.arr2 = [];
    vm.arr3 = [];

    vm.searchedVideo = data => {
        vm.videoData = data;
    };
    vm.getId = id => {
        vm.arr.push(id);
        if (vm.arr.length > 1) {
            while (vm.arr.length > 1) {
                vm.arr.shift();
            };
        };
        console.log(vm.arr[0]);
    };
    vm.clickedVideo = videoLink => {
        vm.video = videoLink;
        vm.arr2.push(videoLink);
    };
    vm.transferVideo = x => {
        vm.arr3.push(x);
        if (vm.arr3.length > 1) {
            while (vm.arr3.length > 1) {
                vm.arr3.shift();
            };
        };
    }
    vm.getVideosByChannel = channel => {
        return $http({
            method: 'GET',
            url: `/api/videos/channels/${channel}`
        });
    };
    vm.searchVideos = (page, query) => {
        vm.query = query;
        return $http({
            method: 'GET',
            url: `/api/videos/${page}?search=${query}`
        });
    };
    vm.getVideoById = id => {
        return $http({
            method: 'GET',
            url: `/api/videos?id=${id}`
        });
    };
    vm.getComments = id => {
        return $http({
            method: 'GET',
            url: `/api/videos/${id}/comments`
        });
    };
    vm.postComment = (id, text) => {
        return $http({
            method: 'POST',
            data: {text},
            url: `/api/videos/${id}/comments`
        });
    };
    vm.login = () => {
        return $http({
            method: 'GET',
            url:  '/api/login'
        });
    };
    vm.logout = () => {
        return $http({
            method: 'GET',
            url: '/api/logout'
        });
    };
    vm.getUser = () => {
        return $http({
            method: 'GET',
            url: '/api/currentuser'
        });
    };

    vm.uploadVid = (video) => {
        return $http({
            method: 'POST',
            data: {video},
            url: '/api/uploadvideo'
        });
    };
    vm.userVideos = () => {
        return $http({
            method: 'GET',
            url: '/api/usersvideos'
        });
    };
    vm.getAccessToken = () => {
        return $http({
            method: 'GET',
            url: '/api/accesstoken'
        });
    };
    vm.addToWatchLater = (video, id) => {
        return $http({
            method: 'POST',
            data: {video},
            url: `/api/videos/${id}/watchlater`
        });
    };
    vm.getWatchLaterList = () => {
        return $http({
            method: 'GET',
            url: '/api/usersvideos'
        });
    };
});
