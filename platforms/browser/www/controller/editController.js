// Edit family information
module.controller("EditFamilyController", function($scope, $rootScope, $timeout, $http) {
  $scope.userName = window.localStorage.getItem("username");
  setValue();
  function setValue() {
    $("#txtType").val($rootScope.profile[0]["familyType"]);
    $("#txtCaste").val($rootScope.profile[0]["caste"]);
    $("#txtTrend").val($rootScope.profile[0]["familyTrend"]);
  }
  $scope.saveHandler = function () {
    if (checkInput()) {
      checkConnection();
    }else {
      console.log('invalid input');
    }
  };
  function checkInput() {
    if ($("#txtType option:selected").val()=="" || $("#txtCaste option:selected").val()=="" || $("#txtTrend option:selected").val()=="") {
      showMessage("All field are require!");
      return false;
    }else {
      return true;
    }
  };
  function callToServer() {
    var type = $("#txtType option:selected").val();
    var caste = $("#txtCaste option:selected").val();
    var trend = $("#txtTrend option:selected").val();
    var dataString="&userName="+$scope.userName+"&type="+type+"&caste="+caste+"&trend="+trend+"&editFamily=";
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
        if (data=="saveSuccess") {
          getData();
          $('top-notification-2, top-notification, bg-red-dark, timeout-notification, timer-notification').slideUp(200);
          $('#success').slideDown(200);
          setTimeout(function(){
            $('#success').slideUp(200);
          }, 4000);
        }else if (data=="saveError") {
          showMessage('Save error, please try again!');
        }
      }
    });
  };
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
      $scope.imgurl = unformatedUrl.replace("?", "%3f");
      $scope.coverUrl = unformatedCoverUrl.replace("?", "%3f");
      console.log($scope.imgurl);
      console.log($scope.coverUrl);
    });
  };

});

// Edit Profile information
module.controller("EditProfileController", function($scope, $rootScope, $timeout, $http) {
  $scope.userName = window.localStorage.getItem("username");
  setValue();
  function setValue() {
    $("#txtLitteracy").val($rootScope.profile[0]["highestLiteracy"]);
    $("#txtWork").val($rootScope.profile[0]["workIn"]);
    $("#txtOccupation").val($rootScope.profile[0]["occupation"]);
    $("#txtIncome").val($rootScope.profile[0]["income"]);
  }
  $scope.saveHandler = function () {
    if (checkInput()) {
      checkConnection();
    }else {
      console.log('invalid input');
    }
  };
  // Call to server
  function callToServer() {
    var litteracy = $("#txtLitteracy option:selected").val();
    var workFor = $("#txtWork option:selected").val();
    var occupation = $("#txtOccupation option:selected").val();
    var income = $("#txtIncome").val();
    var dataString="&userName="+$scope.userName+"&litteracy="+litteracy+"&work="+workFor+"&occupation="+occupation+"&income="+income+"&editProfile=";
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
        if (data=="saveSuccess") {
          getData();
          $('top-notification-2, top-notification, bg-red-dark, timeout-notification, timer-notification').slideUp(200);
          $('#success').slideDown(200);
          setTimeout(function(){
            $('#success').slideUp(200);
          }, 4000);
        }else if (data=="saveError") {
          showMessage('Save error, please try again!');
        }
      }
    });
  }
  // check input
  function checkInput() {
    if ($("#txtLitteracy option:selected").val()=="") {
      showMessage("Litteracy is require!");
      return false;
    }else if ($("#txtWork option:selected").val()=="") {
      showMessage("Work is require!");
      return false;
    }else if ($("#txtIncome").val()=="") {
      showMessage("Income is require!");
      return false;
    }else if (parseInt($("#txtIncome").val(), 10) <= 0) {
      showMessage("Income cant <= 0!");
      return false;
    }else {
      return true;
    }
  };
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
      $scope.imgurl = unformatedUrl.replace("?", "%3f");
      $scope.coverUrl = unformatedCoverUrl.replace("?", "%3f");
      console.log($scope.imgurl);
      console.log($scope.coverUrl);
    });
  };

});

// Edit Bsic information
module.controller("EditBasicInformationController", function($scope, $rootScope, $timeout, $http) {
  $scope.userName = window.localStorage.getItem("username");
  reloadScript();
  setValue();
  // save
  $scope.saveHandler = function () {
    if (checkInput()) {
      checkConnection();
    }else {
      console.log('invalid input!');
    }
  };
  // call to serve
  function callToServer() {
    var userName = window.localStorage.getItem("username");
    var fname = $("#txtFisrtName").val();
    var mname  = $("#txtMiddleName").val();
    var lname = $("#txtLastName").val();
    var gender = $("#txtGender option:selected").val();
    var phone = $("#txtPhone").val();
    var birthday = $("#txtBirthday").val();
    if (birthday==$rootScope.profile[0]["dateOfBirth"]) {
      console.log('birth day not change!');
      var age = $rootScope.profile[0]["age"];
    }else {
      var birthdayArr = birthday.split("-");
      var formatedBirhday = birthdayArr[1]+"/"+birthdayArr[2]+"/"+birthdayArr[0];
      var userYear = parseInt(birthdayArr[0]);
      var currentDate = new Date();
      var currentYear = parseInt(currentDate.getFullYear());
      age = currentYear - userYear;
    };
    var nationality = $("#txtNationality option:selected").val();
    var country  = $("#txtCountry option:selected").val();
    var citySate = $("#txtState option:selected").val();
    var motherTongue = $("#txtMotherTongue option:selected").val();
    var marial = $("#txtMarial option:selected").val();
    var height  = $("#txtHeight").val();
    var weight = $("#txtWeight").val();
    var religion = $("#txtReligion option:selected").val();
    var dataString="&userName="+userName+"&fname="+fname+"&mname="+mname+"&lname="+lname+"&birthday="+formatedBirhday+"&age="+age+"&gender="+gender+"&phone="+phone+"&nationality="+nationality+"&country="+country+"&citystates="+citySate+"&mothertongue="+motherTongue+"&marial="+marial+"&height="+height+"&weight="+weight+"&religion="+religion+"&editBasicInformation=";
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
        if (data=="saveSuccess") {
          getData();
          $('top-notification-2, top-notification, bg-red-dark, timeout-notification, timer-notification').slideUp(200);
          $('#success').slideDown(200);
          setTimeout(function(){
            $('#success').slideUp(200);
          }, 4000);
        }else if (data=="saveError") {
          showMessage('Save error, please try again!');
        }
      }
    });
  };
  // Set old value
  function setValue() {
    $("#txtFisrtName").val($rootScope.profile[0]["firstName"]);
    $("#txtMiddleName").val($rootScope.profile[0]["middleName"]);
    $("#txtLastName").val($rootScope.profile[0]["lastName"]);
    $("#txtPhone").val($rootScope.profile[0]["phoneNumber"]);
    $("#txtBirthday").val($rootScope.profile[0]["dateOfBirth"]);
    $("#txtHeight").val($rootScope.profile[0]["height"]);
    $("#txtWeight").val($rootScope.profile[0]["weight"]);
    $("#txtGender").val($rootScope.profile[0]["gender"]);
    $("#txtNationality").val($rootScope.profile[0]["nationality"]);
    $("#txtCountry").val($rootScope.profile[0]["country"]);
    $("#txtState").val($rootScope.profile[0]["cityStates"]);
    $("#txtMotherTongue").val($rootScope.profile[0]["motherTongue"]);
    $("#txtMarial").val($rootScope.profile[0]["marialStatus"]);
    $("#txtReligion").val($rootScope.profile[0]["religion"]);
  }
  // Check input
  function checkInput() {
    if ($("#txtPhone").val().length < 10 || $("#txtPhone").val().length > 15) {
      showMessage("Phone number from 10 to 15 numbers!");
      return false;
    }else if ($("#txtNationality").val()==null || $("#txtCountry").val()==null || $("#txtState").val()=="" || $("#txtMotherTongue").val()==null || $("#txtState").val()==null) {
      showMessage("Select your country and city/states!");
      return false;
    }else if (parseInt($("#txtHeight").val(), 10) < 50 || parseInt($("#txtHeight").val(), 10) > 250) {
      showMessage("Height from 50 to 250 (cm)");
      return false;
    }else if (parseInt($("#txtWeight").val(), 10) < 30 || parseInt($("#txtWeight").val(), 10) > 200) {
      showMessage("Weight from 30 to 200 (kg)");
      return false;
    }else if ($("#txtBirthday").val()==$rootScope.profile[0]["dateOfBirth"]) {
      return true;
    }else if (checkBirthday($("#txtBirthday").val())) {
      return true;
    }else {
      showMessage("Have error with your birthday!");
      return false;
    }
  }
  // check birthday
  function checkBirthday(birthday) {
    var currentDate = new Date();
    var currentYear = parseInt(currentDate.getFullYear());
    var birthdayArr = birthday.split("-");
    var inputYear = parseInt(birthdayArr[0]);
    var age = currentYear - inputYear;
    console.log('age: ' + age);
    if (age <= 0 || age > 110) {
      return false;
    }else {
      return true;
    }
  };
  // show error
  function showMessage(mess) {
    $scope.errorContent = mess;
    $('bottom-notification-1 bottom-notification bg-red-dark timeout-notification timer-notification').slideUp(200);
    $('#errorMess').slideDown(200);
    setTimeout(function(){
      $('#errorMess').slideUp(200);
    }, 4000);
  };
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
  // Reload jquery scripts
  function reloadScript() {
    $.when(
      $.getScript( "js/countries.js" ),
      $.Deferred(function( deferred ){
        $( deferred.resolve );
      })
    ).done(function(){
      populateCountries("txtCountry", "txtState");
      console.log('script reloaded!');
    });
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
      $rootScope.profile = data;
      var unformatedUrl = $rootScope.profile[0]["avatarUrl"];
      var unformatedCoverUrl = $rootScope.profile[0]["coverImageUrl"];
      $scope.imgurl = unformatedUrl.replace("?", "%3f");
      $scope.coverUrl = unformatedCoverUrl.replace("?", "%3f");
      console.log($scope.imgurl);
      console.log($scope.coverUrl);
    });
  };

});

// Edit Hobby
module.controller("EditHobbyController", function($scope, $rootScope, $timeout, $http) {
  $scope.userName = window.localStorage.getItem("username");
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
