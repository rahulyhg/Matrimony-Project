module.controller("DetailController", function($scope, $rootScope, $http) {
  $scope.userName = window.localStorage.getItem("username");
  reloadScript();
  getHobbyData();
  checkFriendShip();
  getUserImage();

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
