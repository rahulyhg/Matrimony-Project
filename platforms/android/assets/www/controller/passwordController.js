module.controller("PasswordController", function($scope, $rootScope, $http) {
  $scope.userName = window.localStorage.getItem("username");
  $rootScope.errorCount = 0;
  reloadScript();
  $scope.changePassword = function () {
    if (checkInput()) {
      checkConnection();
    }else {
      console.log('invalid input');
    }
  };
  // Reset all
  function resetAll() {
    $('#txtCurrentPassword').val("");
    $('#txtNewPassword').val("");
    $('#txtNewPassword2').val("");
  };
  // Call to server
  function callToServer() {
    var dataString="&userName="+$scope.userName+"&oldPassword="+$('#txtCurrentPassword').val()+"&newPassword="+$('#txtNewPassword').val()+"&changepassword=";
    console.log(dataString);
    $.ajax({
      type: "POST",
      url:"http://139.59.254.92/changepassword.php",
      data: dataString,
      crossDomain: true,
      cache: false,
      beforeSend: function(){ console.log('changing...');},
      success: function(data){
        console.log(data);
        if (data=="success") {
          resetAll();
          $('top-notification-2, top-notification, bg-red-dark, timeout-notification, timer-notification').slideUp(200);
          $('#success').slideDown(200);
          setTimeout(function(){
            $('#success').slideUp(200);
          }, 4000);
        }else if (data=="error") {
          showMessage('Change password error, please try again!');
        }else if (data=="wrongpass") {
          $rootScope.errorCount = $rootScope.errorCount + 1;
          if ($rootScope.errorCount <= 3) {
            showMessage("Your current password is not match! ");
          }else {
            window.localStorage.removeItem("username");
            window.location.replace("index.html");
          }
        };
      }
    });
  };
  // check input data
  function checkInput() {
    if ($('#txtCurrentPassword').val().length<6 || $('#txtNewPassword').val().length<6 || $('#txtNewPassword2').val().length<6) {
      showMessage("Password min 6 character!");
      return false;
    }else if ($('#txtNewPassword').val() != $('#txtNewPassword2').val()) {
      showMessage('New password not match!');
      return false;
    }else {
      return true;
    };
  };
  // Handler menu button
  $scope.menuButtonHandler = function () {
    menu.toggleMenu();
    reloadScript();
  };
  // show error
  function showMessage(mess) {
    $scope.errorContent = mess;
    $('bottom-notification-1 bottom-notification bg-red-dark timeout-notification timer-notification').slideUp(200);
    $('#errorMess').slideDown(200);
    setTimeout(function(){
      $('#errorMess').slideUp(200);
    }, 3000);
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
  // reload script
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
