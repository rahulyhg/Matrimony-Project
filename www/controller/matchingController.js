module.controller("MatchingController", function($scope, $rootScope, $timeout, $http) {
  $scope.userName = window.localStorage.getItem("username");
  checkConnection();
  $scope.rightButtonRematching = function () {
    checkConnection();
  };

  // View profile
  $scope.viewProfile = function (index) {
    var selectedUser = $rootScope.matchingResult[index];
    $rootScope.selectedUser = selectedUser;
    console.log($rootScope.selectedUser);
    $scope.navi.pushPage('detail.html');
  };
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
      getMatchingData();
    });
  };

  function getMatchingData() {
    $('#rightIcon').attr('spin','true');
    console.log('geting matching data...');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/matching.php",
      data: {
        userName: $scope.userName,
        gender: $scope.profile[0]["gender"],
        country: $scope.profile[0]["country"],
        cityStates: $scope.profile[0]["cityStates"],
        religion: $scope.profile[0]["religion"],
        caste: $scope.profile[0]["caste"],
        highestLiteracy: $scope.profile[0]["highestLiteracy"],
        income: $scope.profile[0]["income"]
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      console.log('matching data');
      console.log(data);
      if (data.length==0) {
        console.log('no user suit with this account');
        setTimeout(function(){
          $('#rightIcon').attr('spin','false');
        }, 1000);
        $('#noMatching').show();
      }else {
        $rootScope.matchingResult = data;
        for (var i = 0; i < $rootScope.matchingResult.length; i++) {
          var unformatedUrl = $rootScope.matchingResult[i]["avatarUrl"];
          var formatedUrl = unformatedUrl.replace("?", "%3f");
          $rootScope.matchingResult[i]["avatarUrl"] = formatedUrl;
          var unformatedCoverUrl = $rootScope.matchingResult[i]["coverImageUrl"];
          var formatedCoverUrl = unformatedCoverUrl.replace("?", "%3f");
          $rootScope.matchingResult[i]["coverImageUrl"] = formatedCoverUrl;
          setTimeout(function(){
            $('#rightIcon').attr('spin','false');
          }, 1000);
        }
      }
    });
    request.error(function(){
      showMessage('matchingErr');
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
});
