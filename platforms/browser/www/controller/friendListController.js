module.controller("FriendListController", function($scope, $rootScope, $timeout, $http) {
  $scope.userName = window.localStorage.getItem("username");
  reloadScript();
  checkConnection();
  updateData();
  // Handler menu button
  $scope.menuButtonHandler = function () {
    menu.toggleMenu();
    reloadScript();
  }
  // View profile
  $scope.viewDetail = function (index) {
    var selectedUser = $scope.friend[index];
    $rootScope.selectedUser = selectedUser;
    $scope.navi.pushPage('detail.html');
  };
  // Update data
  function updateData() {
    $timeout(function () {
      checkConnection();
      updateData();
    }, 10000);
  };
  // Chat
  $scope.chat = function (index) {
    console.log('chat');
  };
  // Unfriend
  $scope.unfriend = function (index) {
    console.log('unfriending....');
    ons.notification.confirm({
      message: 'Unfriend '+$scope.friend[index]["lastName"]+' ?',
      modifier: 'material',
      callback: function(idx) {
        switch (idx) {
          case 0:
          console.log('canceled');
          break;
          case 1:
          var request = $http({
            method: "post",
            url: "http://139.59.254.92/unfriend.php",
            data: {
              userName: $scope.userName,
              friendUserName: $scope.friend[index]["userName"]
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
          /* Successful HTTP post request or not */
          request.success(function (data) {
            console.log(data);
            if (data=="success") {
              console.log('unfriend success');
              checkConnection();
            }else if (data=="error") {
              console.log('unfriend fail');
              showMessage('unfriendErr');
            }
          });
          request.error(function() {
            console.log('unfriend fail');
            showMessage('unfriendErr');
          });
          break;
        }
      }
    });
  };
  // Get list friend of user
  function getFriendData() {
    console.log('geting information...');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/getfriendlist.php",
      data: {
        userName: $scope.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      if (data.lenght==0) {
        $('#noFriend').show();
      }else {
        $scope.friend = data;
        for (var i = 0; i < $scope.friend.length; i++) {
          var unformatedUrl = $scope.friend[i]["avatarUrl"];
          var formatedUrl = unformatedUrl.replace("?", "%3f");
          $scope.friend[i]["avatarUrl"] = formatedUrl;
          var unformatedCoverUrl = $scope.friend[i]["coverImageUrl"];
          var formatedCoverUrl = unformatedCoverUrl.replace("?", "%3f");
          $scope.friend[i]["coverImageUrl"] = formatedCoverUrl;
        }
      }
    });
  };
  // Check internet connection
  function checkConnection() {
    $.ajax({
      url: "http://139.59.254.92/insert.php",
      timeout: 10000,
      error: function(jqXHR) {
        if(jqXHR.status==0) {
          showMessage('connectErr');
        }
      },
      success: function() {
        getFriendData();
      }
    });
  };

  function showMessage(messType) {
    switch(messType) {
      case 'connectErr':
      $('top-notification-2, top-notification, bg-red-dark, timeout-notification, timer-notification').slideUp(200);
      $('#connectErr').slideDown(200);
      setTimeout(function(){
        $('#connectErr').slideUp(200);
      }, 5000);
      break;
      case 'unfriendErr':
      $('top-notification-2, top-notification, bg-red-dark, timeout-notification, timer-notification').slideUp(200);
      $('#unfriendErr').slideDown(200);
      setTimeout(function(){
        $('#unfriendErr').slideUp(200);
      }, 5000);
      break;
      default:
      return false;
    }
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
