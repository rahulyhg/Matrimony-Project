module.controller("CameraController", function($scope, $http) {
  // reloadCameraScript();
  var pictureSource; // picture source
  var destinationType; // sets the format of returned value
  console.log(navigator.camera);
  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    console.log('=+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=');
  }
  $scope.captureNewPhoto = function () {
    capturePhoto();
  }
  function onPhotoDataSuccess(imageURI) {
  console.log(imageURI);
  // var cameraImage = document.getElementById('image');
  // cameraImage.style.display = 'block';
  // cameraImage.src = imageURI;
  }

  function onPhotoURISuccess(imageURI) {
  alert(imageURI);
  // var galleryImage = document.getElementById('image');
  // galleryImage.style.display = 'block';
  // galleryImage.src = imageURI;
  }

  function capturePhoto() {
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
  quality: 50,
  targetWidth: 600,
  targetHeight: 600,
  destinationType: destinationType.FILE_URI,
  saveToPhotoAlbum: true
  });
  }

  function getPhoto(source) {
  navigator.camera.getPicture(onPhotoURISuccess, onFail, {
  quality: 50,
  targetWidth: 600,
  targetHeight: 600,
  destinationType: destinationType.FILE_URI,
  sourceType: source
  });
  }

  function onFail(message) {
  //alert('Failed because: ' + message);
  }
  // Close modal function
  $scope.closeModal = function () {
    editAvataModal.hide();
    editCoverModal.hide();
  };

  function reloadCameraScript() {
    $.when(
      $.getScript( "js/cameraHandler.js" ),
      $.Deferred(function( deferred ){
        $( deferred.resolve );
      })
    ).done(function(){
      console.log('camera script reloaded!');
    });
  }
});
