module.controller("MenuController", function($scope, $http) {
  // Profile button Handler
  $scope.inMatching = true;
  $scope.inProfile = false;

  $scope.goProfile = function(){
    if (!$scope.inProfile) {
      menu.closeMenu();
      $scope.inProfile = true;
      $scope.inMatching = false;
      navi.resetToPage('profile.html');
    }else {
      menu.closeMenu();
    }
  };

  $scope.goMatching = function(){
    if (!$scope.inMatching) {
      menu.closeMenu();
      $scope.inProfile = false;
      $scope.inMatching = true;
      navi.resetToPage('matching.html');
    }else {
      menu.closeMenu();
    }
  };

  // Logout button handler
  $scope.logout = function(){
    ons.notification.confirm({
      message: 'Are you sure?',
      modifier: 'material',
      callback: function(idx) {
        switch (idx) {
          case 0:
          console.log('canceled');
          break;
          case 1:
          window.localStorage.removeItem("username");
          window.location.replace("index.html");
          break;
        }
      }
    });
  };
});
