angular.module('vimeoApp').controller('commentsCtrl', function ($scope, mainService) {
  $scope.user = true;
  $scope.getAllComments = () => {
      let id = mainService.arr[0];
      mainService.getComments(id).then(res => {
          $scope.comments = res.data.data;
          console.log($scope.comments);
          for(let i=0; i<$scope.comments.length; i++){
              if($scope.comments[i].user.pictures.sizes[3].link === undefined){
                  
              }
          }
      });
  }
  $scope.addComment = () => {
      let id = mainService.arr[0];
      console.log(id)
      mainService.postComment(id, $scope.text).then(res => {
          $scope.getAllComments();
          $scope.text='';
      });
  };

  $scope.getAllComments();

});
