module.controller("ProfileController", function($scope, $rootScope, $http) {
  $scope.userName = window.localStorage.getItem("username");
  $scope.numbOfImage = 0;
  $scope.imageUrl = '';
  console.log($scope.userName);
  // reloadScript();
  checkConnection();
  getUserImage();
  reloadCameraScript();
  $scope.backEditHandler = function () {
    navi.resetToPage('profile.html');
  };
  // view avatar
  $scope.ViewImg = function () {
    editAvataModal.hide();
    $scope.imageUrl = $scope.imgurl;
    viewImgModal.show();
  };
  // view cover
  $scope.ViewCoverImg = function () {
    editCoverModal.hide();
    viewCoverImgModal.show();
  };
  // Handler menu button
  $scope.menuButtonHandler = function () {
    menu.toggleMenu();
    reloadScript();
  }
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
        userName: $scope.userName
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

  // Set user cover image
  function setCoverImage() {
    $('#coverImage').css('background-image', 'url("' + $scope.coverUrl + '")');
  }

  // Click on avatar Handler
  $scope.avatarMenu = function () {
    $scope.editImageType = "userAvatar";
    editAvataModal.show();
  }

  // Click on cover image
  $scope.coverMenu = function () {
    $scope.editImageType = "coverImage";
    editCoverModal.show();
  }

  // Close modal function
  $scope.closeModal = function () {
    editAvataModal.hide();
    editCoverModal.hide();
  }

  function upload() {
    console.log('uploading....');
    var img = document.getElementById('avatar');
    var imageURI = img.src;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var params = new Object();
    options.params = params;
    options.chunkedMode = false;
    var ft = new FileTransfer();
    ft.upload(imageURI, "http://139.59.254.92/uploadDemo.php", win, fail,options);
  }

  // Get user information
  function getData() {
    console.log('geting information...');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/getinfor.php",
      data: {
        userName: $scope.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      console.log(data);
      $rootScope.profile = data;
      var unformatedUrl = $rootScope.profile[0]["avatarUrl"];
      var unformatedCoverUrl = $rootScope.profile[0]["coverImageUrl"];
      console.log("====== "+$rootScope.profile[0]["coverImageUrl"]);
      $scope.imgurl = unformatedUrl.replace("?", "%3f");
      $scope.coverUrl = unformatedCoverUrl.replace("?", "%3f");
      console.log($scope.imgurl);
      console.log($scope.coverUrl);
      setCoverImage();
    });
  };

  // Get user hobby
  function getHobbyData() {
    $scope.movies = [];
    $scope.music = [];
    $scope.sport = [];
    $scope.other = [];
    console.log('geting hobby...');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/gethobby.php",
      data: {
        userName: $scope.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      console.log(data);
      $scope.hobby = data;
      console.log($scope.hobby.length);
      for (var i = 0; i < $scope.hobby.length; i++) {
        switch ($scope.hobby[i].hobbyType) {
          case 'movies':
          $scope.movies.push($scope.hobby[i]);
          break;
          case 'music':
          $scope.music.push($scope.hobby[i]);
          break;
          case 'sport':
          $scope.sport.push($scope.hobby[i]);
          break;
          case 'other':
          $scope.other.push($scope.hobby[i]);
          break;
          default:

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
        getData();
        getHobbyData();
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
      default:
      return false;
    }
  };

  function reloadCameraScript() {
    $.when(
      $.getScript( "js/cameraHandler.js" ),
      // $.getScript( "lib/matterTheme/scripts/jqueryui.js" ),
      // $.getScript( "lib/matterTheme/scripts/framework-plugins.js" ),
      // $.getScript( "lib/matterTheme/scripts/custom.js" ),
      $.Deferred(function( deferred ){
        $( deferred.resolve );
      })
    ).done(function(){
      console.log('camera script reloaded!');
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
