module.controller("MenuController", function($scope, $rootScope, $timeout, $http) {
  // Profile button Handler
  $scope.userName = window.localStorage.getItem("username");
  $scope.inMatching = true;
  $scope.inProfile = false;
  $scope.inFriendList = false;
  $scope.inFriendRequestList = false;
  $scope.requestnumb=0;
  $scope.requestCount = 0;
  $scope.friendnumb = 0;
  $scope.seftRequestnumb = 0;
  countRequest();
  countFriend();
  countSeftRequest();
  $scope.requestCount = $scope.requestnumb;
  updateData();
  // updateMenu();
  function updateMenu() {
    $timeout(function () {
      reloadScript();
      updateMenu();
    }, 1000);
  };
  function updateData() {
    $timeout(function () {
      reloadScript();
      console.log('update data....');
      countRequest();
      countFriend();
      countSeftRequest();
      updateData();
    }, 10000);
  };

  $scope.gofriendRequestList = function () {
    if (!$scope.inFriendRequestList) {
      menu.closeMenu();
      $scope.inProfile = false;
      $scope.inMatching = false;
      $scope.inFriendList = false;
      $scope.inFriendRequestList = true;
      navi.resetToPage('friendRequestList.html');
      reloadScript();
    }else {
      menu.closeMenu();
    }
  }
  $scope.goFriendList = function () {
    if (!$scope.inFriendList) {
      menu.closeMenu();
      $scope.inProfile = false;
      $scope.inMatching = false;
      $scope.inFriendList = true;
      $scope.inFriendRequestList = false;
      navi.resetToPage('friendList.html');
      reloadScript();
    }else {
      menu.closeMenu();
    }
  };

  $scope.goProfile = function(){
    if (!$scope.inProfile) {
      menu.closeMenu();
      $scope.inProfile = true;
      $scope.inMatching = false;
      $scope.inFriendList = false;
      $scope.inFriendRequestList = false;
      navi.resetToPage('profile.html');
      reloadScript();
    }else {
      menu.closeMenu();
    }
  };

  $scope.goMatching = function(){
    if (!$scope.inMatching) {
      menu.closeMenu();
      $scope.inProfile = false;
      $scope.inMatching = true;
      $scope.inFriendList = false;
      $scope.inFriendRequestList = false;
      navi.resetToPage('matching.html');
      reloadScript();
    }else {
      menu.closeMenu();
    }
  };

  // Count friend request
  function countRequest() {
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/countfriendrequest.php",
      data: {
        userName: $scope.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      console.log('friend request data');
      console.log(data);
      $scope.requestnumb = data.length;
    });
  }
  // Count friend
  function countFriend() {
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/countfriend.php",
      data: {
        userName: $scope.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      $scope.friendnumb = data.length;
    });
  }
  // Count friend request
  function countSeftRequest() {
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/countseftrequest.php",
      data: {
        userName: $scope.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      $scope.seftRequestnumb = data.length;
    });
  }

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

  // Reload jquery scripts
  function reloadScript() {
    $.when(
      $.getScript( "lib/matterTheme/scripts/jquery.js" ),
      $.getScript( "lib/matterTheme/scripts/jqueryui.js" ),
      $.getScript( "lib/matterTheme/scripts/framework-plugins.js" ),
      $.getScript( "lib/matterTheme/scripts/custom.js" ),
      $.Deferred(function( deferred ){
        $( deferred.resolve );
      })
    ).done(function(){
      console.log('script reloaded!');
    });
  }
});
