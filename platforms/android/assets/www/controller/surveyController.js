module.controller("SurveyController", function($scope, $rootScope, $timeout, $http) {
  $scope.userName = window.localStorage.getItem("username");
  $scope.survey = '';
  getSurvey();
  // relaod
  $scope.reload = function () {
    getSurvey();
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
      console.log(data);
      if (data.length!=0) {
        $scope.survey = data;
        setValue();
        setTimeout(function(){
          $('#rightIcon').attr('spin','false');
        }, 1000);
      }else {
        showMessage('Cant get your survey, please try again!');
      }
    });
    request.error(function () {
      showMessage('Cant get your survey, please try again!');
    });
  };
  // cal to server
  function callToServer() {
    var gender = $('#txtGender').val();
    var minAge = $('#txtMinAge').val();
    var maxAge = $('#txtMaxAge').val();
    var city = $('#txtCity').val();
    var religion = $('#txtReligion').val();
    var caste = $('#txtCaste').val();
    var dataString="&userName="+$scope.userName+"&gender="+gender+"&minAge="+minAge+"&maxAge="+maxAge+"&city="+city+"&religon="+religion+"&caste="+caste+"&editsurvey=";
    console.log(dataString);
    $.ajax({
      type: "POST",
      url:"http://139.59.254.92/saveinfo.php",
      data: dataString,
      crossDomain: true,
      cache: false,
      beforeSend: function(){ console.log('saving...');},
      success: function(data){
        console.log(data);
        // save success
        if (data=="success") {
          getSurvey();
          $('top-notification-2, top-notification, bg-red-dark, timeout-notification, timer-notification').slideUp(200);
          $('#success').slideDown(200);
          setTimeout(function(){
            $('#success').slideUp(200);
          }, 4000);
        }else if (data=="error") {
          showMessage('Save error, please try again!');
        }
      }
    });
  };
  // save survey
  $scope.saveSurvey = function () {
    if (checkInput()) {
      checkConnection();
    }else {
      console.log('invalid input');
    }
  };
  // check INPUT
  function checkInput() {
    if ($('#txtMinAge').val() < 16 || $('#txtMinAge').val() > 80 || $('#txtMaxAge').val() < 16 || $('#txtMaxAge').val() > 80) {
      showMessage('Age only from 16 to 80!');
      return false;
    }else if ($('#txtMinAge').val() > $('#txtMaxAge').val()) {
      showMessage('Max age cant less than min age!');
      return false;
    }else {
      return true;
    }
  }
  // set data
  function setValue() {
    $('#txtGender').val($scope.survey[0]["gender"]);
    $('#txtMinAge').val($scope.survey[0]["minAge"]);
    $('#txtMaxAge').val($scope.survey[0]["maxAge"]);
    $('#txtCity').val($scope.survey[0]["otherCity"]);
    $('#txtReligion').val($scope.survey[0]["otherReligion"]);
    $('#txtCaste').val($scope.survey[0]["caste"]);
  }
  // show error
  function showMessage(mess) {
    $scope.errorContent = mess;
    $('bottom-notification-1 bottom-notification bg-red-dark timeout-notification timer-notification').slideUp(200);
    $('#errorMess').slideDown(200);
    setTimeout(function(){
      $('#errorMess').slideUp(200);
    }, 4000);
  }
  // Check internet connection
  function checkConnection() {
    $.ajax({
      url: "http://139.59.254.92/insert.php",
      timeout: 10000,
      error: function(jqXHR) {
        if(jqXHR.status==0) {
          showMessage('Cant connect to server!');
        }
      },
      success: function() {
        callToServer();
      }
    });
  };
});
