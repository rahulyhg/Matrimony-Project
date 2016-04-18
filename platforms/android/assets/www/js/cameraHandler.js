var pictureSource; // picture source
var destinationType; // sets the format of returned value

document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {
pictureSource = navigator.camera.PictureSourceType;
destinationType = navigator.camera.DestinationType;
console.log('API ready');
}

function onPhotoDataSuccess(imageURI) {
console.log(imageURI);
var cameraImage = document.getElementById('image');
cameraImage.style.display = 'block';
cameraImage.src = imageURI;
}

function onPhotoURISuccess(imageURI) {
console.log(imageURI);
var galleryImage = document.getElementById('image');
galleryImage.style.display = 'block';
galleryImage.src = imageURI;
}

function capturePhoto() {
navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
quality: 30,
targetWidth: 600,
targetHeight: 600,
destinationType: destinationType.FILE_URI,
saveToPhotoAlbum: true
});
}

function getPhoto(source) {
navigator.camera.getPicture(onPhotoURISuccess, onFail, {
quality: 30,
targetWidth: 600,
targetHeight: 600,
destinationType: destinationType.FILE_URI,
sourceType: source
});
}

function onFail(message) {
//alert('Failed because: ' + message);
}
