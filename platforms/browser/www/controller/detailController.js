module.controller("DetailController", function($scope, $rootScope, $http) {
  $scope.userName = window.localStorage.getItem("username");
  $scope.friend = [];
  $scope.frStt = '';
  $scope.friendIcon = '';
  $scope.friendShip = '';
  $scope.numbOfImage = 0;
  reloadScript();
  checkFriendShip();
  // Friend button handler
  $scope.btnFriendHandler = function () {
    switch ($scope.friendShip) {
      case 'no':
      console.log('adding friend....');
      break;
      case 'request':
      ons.notification.confirm({
        message: 'Cancel request?',
        modifier: 'material',
        callback: function(idx) {
          switch (idx) {
            case 0:
            console.log('canceled');
            break;
            case 1:
            console.log('canceled');
            break;
          }
        }
      });
      break;
      case 'friend':
      ons.notification.confirm({
        message: 'Unfriend '+$rootScope.selectedUser.lastName+' ?',
        modifier: 'material',
        callback: function(idx) {
          switch (idx) {
            case 0:
            console.log('canceled');
            break;
            case 1:
            console.log('unfriend....');
            break;
          }
        }
      });
      break;
      default:
      return false;
    }
  };
  // Button chat handler
  $scope.btnChatHandler = function () {
    switch ($scope.friendShip) {
      case 'no':
      showMessage('chatPermissionErr');
      break;
      case 'request':
      showMessage('chatPermissionErr');
      break;
      case 'friend':
      alert('can chat!');
      break;
      default:
      return false;
    }
  };
  // initial justify gallery
  function apply_gallery_justification(){
    console.log('apply');
    var screen_widths = $(window).width();
    //MOBILE SETTINGS
    if( screen_widths < 768){
      $('.gallery-justified').justifiedGallery({
        rowHeight : 70,
        maxRowHeight : 370,
        margins : 5,
        fixedHeight:false
      });
    };
    // TABLET SETTINGS
    if( screen_widths > 768){
      $('.gallery-justified').justifiedGallery({
        rowHeight : 150,
        maxRowHeight : 370,
        margins : 5,
        fixedHeight:false
      });
    };
  };
  // Get user image
  function getUserImage() {
    console.log('getting image...');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/getuserimage.php",
      data: {
        userName: $rootScope.selectedUser.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      console.log('data image: ');
      console.log(data);
      $scope.userImage = data;
      for (var i = 0; i < $scope.userImage.length; i++) {
        $('<a href="'+$scope.userImage[i]["imageUrl"]+'" class="show-gallery" title="Image"><img alt="img" src="'+$scope.userImage[i]["imageUrl"]+'"></a>').appendTo('#userGallery');
      }
      apply_gallery_justification();
      reloadScript();
      $scope.numbOfImage = $scope.userImage.length;
    });
  };

  // Check friendship
  function checkFriendShip() {
    console.log('checking friendship...');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/checkfriend.php",
      data: {
        userName: $scope.userName,
        friendUserName: $rootScope.selectedUser.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      console.log(data);
      $scope.friend = data;
      console.log($scope.friend.length);
      if ($scope.friend.length == 0) {
        console.log('no friend');
        $scope.friendShip = 'no';
        $scope.friendIcon = "fa fa-user-plus";
        $scope.frStt = "Add friend";
        disableField();
      }else if ($scope.friend[0]["friendShipStatus"] == "request") {
        console.log('request');
        $scope.friendShip = 'request';
        $scope.friendIcon = "fa fa-spinner";
        $scope.frStt = "Requesting";
        disableField();
      }else {
        console.log('friend');
        $scope.friendShip = 'friend';
        $scope.friendIcon = "fa fa-user-times";
        $scope.frStt = "Unfriend";
        getUserImage();
        getHobbyData();
      }
    });
  }
  // Get user hobby
  function getHobbyData() {
    $scope.umovies = [];
    $scope.umusic = [];
    $scope.usport = [];
    $scope.uother = [];
    console.log('geting hobby...');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/gethobby.php",
      data: {
        userName: $rootScope.selectedUser.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      console.log(data);
      $scope.uhobby = data;
      console.log($scope.uhobby.length);
      for (var i = 0; i < $scope.uhobby.length; i++) {
        switch ($scope.uhobby[i].hobbyType) {
          case 'movies':
          $scope.umovies.push($scope.uhobby[i]);
          break;
          case 'music':
          $scope.umusic.push($scope.uhobby[i]);
          break;
          case 'sport':
          $scope.usport.push($scope.uhobby[i]);
          break;
          case 'other':
          $scope.uother.push($scope.uhobby[i]);
          break;
          default:
        }
      }
    });
  };
  function disableField() {
    $('#profileDes').hide();
    $("#hobbyContentHeader").hide();
    $("#educationContentHeader").hide();
    $("#familyContentHeader").hide();
    $rootScope.selectedUser.phoneNumber = "********";
    $rootScope.selectedUser.email = "********";
    $('#alertGallery').show();
    showMessage('permissionErr');
  }

  function showMessage(messType) {
    switch(messType) {
      case 'connectErr':
      $('top-notification-2, top-notification, bg-red-dark, timeout-notification, timer-notification').slideUp(200);
      $('#connectErr').slideDown(200);
      setTimeout(function(){
        $('#connectErr').slideUp(200);
      }, 5000);
      break;
      case 'permissionErr':
      $('top-notification-2, top-notification, bg-red-dark, timeout-notification, timer-notification').slideUp(200);
      $('#permissionErr').slideDown(200);
      setTimeout(function(){
        $('#permissionErr').slideUp(200);
      }, 3000);
      break;
      case 'chatPermissionErr':
      $('top-notification-2, top-notification, bg-red-dark, timeout-notification, timer-notification').slideUp(200);
      $('#chatPermissionErr').slideDown(200);
      setTimeout(function(){
        $('#chatPermissionErr').slideUp(200);
      }, 3000);
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
