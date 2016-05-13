module.controller("DetailController", function($scope, $rootScope, $timeout, $http) {
  $scope.userName = window.localStorage.getItem("username");
  $scope.friend = [];
  $scope.frStt = '';
  $scope.friendIcon = '';
  $scope.friendShip = '';
  $scope.numbOfImage = 0;
  $scope.phone = '';
  $scope.email = '';
  reloadScript();
  checkFriendRequest();
  // Handler back button
  $scope.backHandler = function () {
    $scope.navi.popPage();
    reloadScript();
  };
  // Load function
  $scope.load = function($done) {
    $timeout(function() {
      reloadScript();
      checkFriendRequest();
      $done();
    }, 500);
  };
  // Accept friend
  function acceptFriendRequest() {
    console.log('accepting request....');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/acceptfriend.php",
      data: {
        userName: $rootScope.selectedUser.userName,
        friendUserName: $scope.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      console.log(data);
      if (data=="success") {
        console.log('now its my friend');
        $scope.friendShip = 'friend';
        $scope.friendIcon = "fa fa-user-times";
        $scope.frStt = "Unfriend";
        enableField();
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
  // Add friend
  function addFriend() {
    console.log('sending request....');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/addfriend.php",
      data: {
        userName: $scope.userName,
        friendUserName: $rootScope.selectedUser.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      console.log(data);
      if (data=="success") {
        $scope.friendShip = 'request';
        $scope.friendIcon = "fa fa-spinner";
        $scope.frStt = "Requesting";
        disableField();
      }else if (data=="error") {
        console.log('add friend fail');
        showMessage('addfriendErr');
      }
    });
    request.error(function() {
      console.log('add friend fail');
      showMessage('addfriendErr');
    });
  };
  // Unfriend
  function unfriend() {
    console.log('unfriending....');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/unfriend.php",
      data: {
        userName: $scope.userName,
        friendUserName: $rootScope.selectedUser.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      console.log(data);
      if (data=="success") {
        console.log('now its not friend');
        $scope.friendShip = 'no';
        $scope.friendIcon = "fa fa-user-plus";
        $scope.frStt = "Add friend";
        disableField();
      }else if (data=="error") {
        console.log('unfriend fail');
        showMessage('unfriendErr');
      }
    });
    request.error(function() {
      console.log('unfriend fail');
      showMessage('unfriendErr');
    });
  };
  // Cancel request
  function cancelRequest() {
    console.log('cancel request....');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/cancelrequest.php",
      data: {
        userName: $scope.userName,
        friendUserName: $rootScope.selectedUser.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      console.log(data);
      if (data=="success") {
        console.log('now its not friend');
        $scope.friendShip = 'no';
        $scope.friendIcon = "fa fa-user-plus";
        $scope.frStt = "Add friend";
        disableField();
      }else if (data=="error") {
        console.log('cancel request fail');
        showMessage('cancelrequestErr');
      }
    });
    request.error(function() {
      console.log('cancel request fail');
      showMessage('cancelrequestErr');
    });
  }
  // Friend button handler
  $scope.btnFriendHandler = function () {
    switch ($scope.friendShip) {
      case 'no':
      addFriend();
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
            cancelRequest();
            break;
          }
        }
      });
      break;
      case 'request to me':
      acceptFriendRequest();
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
            unfriend();
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
      case 'request to me':
      showMessage('chatPermissionErr');
      break;
      case 'friend':
      navi.pushPage('chat.html');
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
        var unformatUrl = $scope.userImage[i]["imageUrl"];
        var formatedUrl = unformatUrl.replace("?", "%3f");
        $scope.userImage[i]["imageUrl"] = formatedUrl;
      }
      for (var i = 0; i < $scope.userImage.length; i++) {
        $('<a href="'+$scope.userImage[i]["imageUrl"]+'" class="show-gallery" title="Image"><img alt="img" src="'+$scope.userImage[i]["imageUrl"]+'"></a>').appendTo('#userGallery');
      }
      apply_gallery_justification();
      reloadScript();
      $scope.numbOfImage = $scope.userImage.length;
    });
    request.error(function() {
      console.log('getting image fail');
      showMessage('connectErr');
    });
  };
  // Check if this user has send request to me
  function checkFriendRequest() {
    console.log('checking friend request...');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/checkfriendrequest.php",
      data: {
        userName: $rootScope.selectedUser.userName,
        friendUserName: $scope.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      console.log(data);
      $scope.friend = data;
      if ($scope.friend.length == 0) {
        console.log('checking friendship');
        checkFriendShip();
      }else if ($scope.friend[0]["friendShipStatus"] == "request") {
        console.log('this user has send request to me');
        $scope.friendShip = 'request to me';
        $scope.friendIcon = "fa fa-user-plus";
        $scope.frStt = "Accept";
        disableField();
      }else if ($scope.friend[0]["friendShipStatus"] == "friend") {
        console.log('its my friend');
        $scope.friendShip = 'friend';
        $scope.friendIcon = "fa fa-user-times";
        $scope.frStt = "Unfriend";
        getUserImage();
        getHobbyData();
      }
    });
    request.error(function() {
      console.log('checking friend request fail');
      showMessage('connectErr');
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
        // dont have request to this user
        // checking request from that user
        console.log('dont have friend or request to this user');
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
        console.log('its my friend');
        $scope.friendShip = 'friend';
        $scope.friendIcon = "fa fa-user-times";
        $scope.frStt = "Unfriend";
        getUserImage();
        getHobbyData();
      }
    });
    request.error(function() {
      console.log('check friendship fail');
      showMessage('connectErr');
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
  // Disable field if not friend
  function disableField() {
    $('#profileDes').hide();
    $("#hobbyContentHeader").hide();
    $("#educationContentHeader").hide();
    $("#familyContentHeader").hide();
    $('#userGallery').hide();
    $scope.phone = $rootScope.selectedUser.phoneNumber;
    $rootScope.selectedUser.phoneNumber = "********";
    $scope.email = $rootScope.selectedUser.email;
    $rootScope.selectedUser.email = "********";
    $('#alertGallery').show();
    showMessage('permissionErr');
  }
  // Enable field after its friend
  function enableField() {
    $rootScope.selectedUser.phoneNumber = $scope.phone;
    $rootScope.selectedUser.email = $scope.email;
    $('#alertGallery').hide();
    $('#userGallery').show();
    getUserImage();
    getHobbyData();
    $('#profileDes').show();
    $("#hobbyContentHeader").show();
    $("#educationContentHeader").show();
    $("#familyContentHeader").show();

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
      case 'acceptErr':
      $('top-notification-2, top-notification, bg-red-dark, timeout-notification, timer-notification').slideUp(200);
      $('#acceptErr').slideDown(200);
      setTimeout(function(){
        $('#acceptErr').slideUp(200);
      }, 3000);
      break;
      case 'unfriendErr':
      $('top-notification-2, top-notification, bg-red-dark, timeout-notification, timer-notification').slideUp(200);
      $('#unfriendErr').slideDown(200);
      setTimeout(function(){
        $('#unfriendErr').slideUp(200);
      }, 3000);
      break;
      case 'addfriendErr':
      $('top-notification-2, top-notification, bg-red-dark, timeout-notification, timer-notification').slideUp(200);
      $('#addfriendErr').slideDown(200);
      setTimeout(function(){
        $('#addfriendErr').slideUp(200);
      }, 3000);
      break;
      case 'cancelrequestErr':
      $('top-notification-2, top-notification, bg-red-dark, timeout-notification, timer-notification').slideUp(200);
      $('#cancelrequestErr').slideDown(200);
      setTimeout(function(){
        $('#cancelrequestErr').slideUp(200);
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
