angular.module('vimeoApp').controller('navBarCtrl', function ($scope, mainService, $state) {

    $scope.profilePicAndUpload = false;
    $scope.logInNavBar = true;
    $scope.mainDropDown = true;

    $scope.login = () => {
        mainService.login().then(res => {
            $scope.data = res.data;
        })
    }
    $scope.logout = () => {
        mainService.logout().then(res => {
            let loggedOut = res.data;
            $scope.logInNavBar = loggedOut;
            $scope.profilePicAndUpload = !loggedOut;
            $scope.mainDropDown = loggedOut;
            $state.go('home');
        })
    }
    $scope.searchQuery = query => {
        $state.go('loading');
        mainService.searchVideos(1, query).then(response => {
            mainService.searchedVideo(response.data.data);
            $state.go('search');
            $scope.query = '';
        })
    }
    $scope.getUser = () => {
        $state.go('uploadVideo');
        mainService.getUser().then(res => {
        })
    }
    $scope.checkUser = () => {
        mainService.getUser().then(res => {
            if (res.data.name) {
                $scope.logInNavBar = false;
                $scope.profilePicture = res.data.pictures[3].link;
                $scope.userName = res.data.name;
                $scope.profilePicAndUpload = true;
            }
        })
    }
    $scope.checkUser();
});
