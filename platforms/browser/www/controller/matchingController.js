module.controller("MatchingController", function($scope, $rootScope, $timeout, $http) {
  $scope.userName = window.localStorage.getItem("username");
  $scope.survey = '';
  $rootScope.matchingResult = '';
  $('#matchingResult').hide();
  checkConnection();
  reloadScript();
  $scope.rightButtonRematching = function () {
    checkConnection();
  };
  // Handler menu button
  $scope.menuButtonHandler = function () {
    menu.toggleMenu();
    reloadScript();
  }
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
      // getMatchingData();
    });
  };
  // Get curent survey
  function getSurvey() {
    $('#rightIcon').attr('spin','true');
    console.log('geting current survey...');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/getsurvey.php",
      data: {
        userName: $scope.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      console.log("survey data:");
      console.log(data);
      if (data.length!=0) {
        $scope.survey = data;
        getMatchingData();
        setTimeout(function(){
          $('#rightIcon').attr('spin','false');
        }, 1000);
      }else {
        showErr('Cant get your survey, please try again!');
      }
    });
    request.error(function () {
      showErr('Cant get your survey, please try again!');
    });
  };
  // get matching data
  function getMatchingData() {
    $('#matchingResult').hide();
    $('#rightIcon').attr('spin','true');
    console.log('geting matching data...');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/matching.php",
      data: {
        userName: $scope.userName,
        gender: $scope.survey[0]["gender"],
        country: $scope.profile[0]["country"],
        cityStates: $scope.profile[0]["cityStates"],
        religion: $scope.profile[0]["religion"],
        caste: $scope.survey[0]["caste"],
        minAge: $scope.survey[0]["minAge"],
        maxAge: $scope.survey[0]["maxAge"],
        otherCity: $scope.survey[0]["otherCity"],
        otherReligion: $scope.survey[0]["otherReligion"]
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
        $('#matchingResult').hide();
        $('#noMatching').show();
      }else {
        $('#matchingResult').show();
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
        getSurvey();
      }
    });
  };
  // show error
  function showErr(mess) {
    $scope.errorContent = mess;
    $('bottom-notification-1 bottom-notification bg-red-dark timeout-notification timer-notification').slideUp(200);
    $('#errorMess').slideDown(200);
    setTimeout(function(){
      $('#errorMess').slideUp(200);
    }, 4000);
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
