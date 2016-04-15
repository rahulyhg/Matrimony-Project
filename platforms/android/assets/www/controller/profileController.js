matrimony.controller("profileController", function($scope, $http) {
  $scope.userName = window.localStorage.getItem("username");
  console.log($scope.userName);
  getData();
  // $scope.profile = getProfileData(userName);
  // $scope.profile = null;
  function getData() {
    console.log('geting...');
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
      $scope.imgurl = unformatedUrl.replace("?", "%3f");
      console.log($scope.imgurl);
    });
  };

});
