angular.module('vimeoApp')
.directive('navBar', function() {

  return {
    restrict: 'E',
    templateUrl: './views/navBar.html',
    link: function(scope){
    },
    controller: 'navBarCtrl'
    }

})
