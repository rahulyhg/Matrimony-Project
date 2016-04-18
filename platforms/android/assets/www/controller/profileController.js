module.controller("ProfileController", function($scope, $http) {
  $scope.userName = window.localStorage.getItem("username");
  var pictureSource;
  var destinationType;
  console.log($scope.userName);
  reloadScript();
  checkConnection();
  apply_gallery_justification();
  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    console.log('API is ready');
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
  // Capture photo handler
  $scope.capture = function () {
    capturePhoto();
  }
  // Take new photo
  function capturePhoto() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
      quality: 50,
      targetWidth: 600,
      targetHeight: 600,
      destinationType: destinationType.FILE_URI,
      saveToPhotoAlbum: true
    });
  }
  // Get photo from gallery
  function getPhoto(source) {
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
      quality: 50,
      targetWidth: 600,
      targetHeight: 600,
      destinationType: destinationType.FILE_URI,
      sourceType: source
    });
  }
  // Fail
  function onFail(message) {
  }

  function onPhotoDataSuccess(imageURI) {
    console.log(imageURI);
    var avatar = document.getElementById('#'+$scope.editImageType);
    avatar.src = imageURI;
  }

  function onPhotoURISuccess(imageURI) {
    console.log(imageURI);
    var avatar = document.getElementById('#'+$scope.editImageType);
    avatar.src = imageURI;
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

  function win(r) {
    var regExp = /\[name] => ([^)]+)\[type]/;
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    var test = JSON.stringify(r.response);
    console.log(test);
    if (r.responseCode == 200) {
      var matchesUrl = regExp.exec(test);
      var imgUrl = matchesUrl[1];
      var imrUrlFormated = imgUrl.slice(0,-14);
      $scope.uploadedUrl = imrUrlFormated;
      // window.localStorage.setItem("imgUrl", imrUrlFormated);
      saveToServer(imrUrlFormated);
    }
  }
  // upload image error
  function fail(error) {
    showMessage('otherError');
    console.log("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
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
      $scope.profile = data;
      var unformatedUrl = $scope.profile[0]["avatarUrl"];
      var unformatedCoverUrl = $scope.profile[0]["coverImageUrl"];
      console.log("====== "+$scope.profile[0]["coverImageUrl"]);
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
