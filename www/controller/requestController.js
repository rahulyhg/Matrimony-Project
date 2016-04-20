module.controller("RequestController", function($scope, $rootScope, $timeout, $http) {
  $scope.userName = window.localStorage.getItem("username");
  reloadScript();
  checkConnection();
  updateData();
  // Decide request
  $scope.decide = function (index) {
    console.log('deciding....');
    ons.notification.confirm({
      message: 'Decide friend request from '+$scope.request[index]["lastName"]+' ?',
      modifier: 'material',
      callback: function(idx) {
        switch (idx) {
          case 0:
          console.log('canceled');
          break;
          case 1:
          var request = $http({
            method: "post",
            url: "http://139.59.254.92/deciderequest.php",
            data: {
              userName: $scope.request[index]["userName"],
              friendUserName: $scope.userName
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
          /* Successful HTTP post request or not */
          request.success(function (data) {
            console.log(data);
            if (data=="success") {
              console.log('decide success');
              checkConnection();
            }else if (data=="error") {
              console.log('decide fail');
              showMessage('cancelErr');
            }
          });
          request.error(function() {
            console.log('decide fail');
            showMessage('cancelErr');
          });
          break;
        }
      }
    });
  }
  // Accept friend
  $scope.acceptFriend = function (index) {
    console.log('accepting request....');
    console.log($scope.request[index]["userName"]);
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/acceptfriend.php",
      data: {
        userName: $scope.request[index]["userName"],
        friendUserName: $scope.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      console.log(data);
      if (data=="success") {
        checkConnection();
      }else if (data=="error") {
        console.log('accept fail');
        showMessage('acceptErr');
      }
    });
    request.error(function() {
      console.log('accept fail');
      showMessage('acceptErr');
    });
  };
  // View profile
  $scope.viewProfile = function (index) {
    var selectedUser = $scope.request[index];
    $rootScope.selectedUser = selectedUser;
    $scope.navi.pushPage('detail.html');
  };
  // Update data
  function updateData() {
    $timeout(function () {
      checkConnection();
      updateData();
    }, 10000);
  }
  // Unfriend
  $scope.accept = function (index) {
    console.log('accepting....');

  };
  // Get list friend of user
  function getRequestData() {
    console.log('geting information...');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/getfriendrequestlist.php",
      data: {
        userName: $scope.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      if (data.lenght==0) {
        $('#noRequest').show();
      }else {
        $scope.request = data;
        for (var i = 0; i < $scope.request.length; i++) {
          var unformatedUrl = $scope.request[i]["avatarUrl"];
          var formatedUrl = unformatedUrl.replace("?", "%3f");
          $scope.request[i]["avatarUrl"] = formatedUrl;
          var unformatedCoverUrl = $scope.request[i]["coverImageUrl"];
          var formatedCoverUrl = unformatedCoverUrl.replace("?", "%3f");
          $scope.request[i]["coverImageUrl"] = formatedCoverUrl;
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
        getRequestData();
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
      case 'acceptErr':
      $('top-notification-2, top-notification, bg-red-dark, timeout-notification, timer-notification').slideUp(200);
      $('#acceptErr').slideDown(200);
      setTimeout(function(){
        $('#acceptErr').slideUp(200);
      }, 5000);
      break;
      case 'cancelErr':
      $('top-notification-2, top-notification, bg-red-dark, timeout-notification, timer-notification').slideUp(200);
      $('#cancelErr').slideDown(200);
      setTimeout(function(){
        $('#cancelErr').slideUp(200);
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
