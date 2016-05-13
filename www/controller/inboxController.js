module.controller("InboxController", function($scope, $rootScope, $timeout, $http) {
  $scope.userName = window.localStorage.getItem("username");
  reloadScript();
  checkConnection();
  // Chat
  $scope.goChat = function (index) {
    var selectedUser = $scope.inbox[index];
    $rootScope.selectedUser = selectedUser;
    console.log($rootScope.selectedUser);
    navi.pushPage('chat.html');
  };
  // Get list inbox of user
  function getInboxData() {
    console.log('geting inbox...');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/getinboxlist.php",
      data: {
        userName: $scope.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      if (data.lenght==0) {
        $('#noInbox').show();
      }else {
        $scope.inbox = data;
        for (var i = 0; i < $scope.inbox.length; i++) {
          var unformatedUrl = $scope.inbox[i]["avatarUrl"];
          var formatedUrl = unformatedUrl.replace("?", "%3f");
          $scope.inbox[i]["avatarUrl"] = formatedUrl;
        }
      }
    });
  };
  // reload inbox
  $scope.rightButtonRematching = function () {
    $('#rightIcon').attr('spin','true');
    checkConnection();
    setTimeout(function(){
      $('#rightIcon').attr('spin','false');
    }, 1000);
  };
  // Delete inbox
  $scope.deleteInbox = function (index) {
    console.log('deleting....');
    ons.notification.confirm({
      message: 'Are your sure?',
      modifier: 'material',
      callback: function(idx) {
        switch (idx) {
          case 0:
          console.log('canceled');
          break;
          case 1:
          var request = $http({
            method: "post",
            url: "http://139.59.254.92/deleteinbox.php",
            data: {
              userName: $scope.userName,
              sendTo: $scope.inbox[index]["userName"]
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
          /* Successful HTTP post request or not */
          request.success(function (data) {
            console.log(data);
            if (data=="success") {
              console.log('delete success');
              checkConnection();
            }else if (data=="error") {
              console.log('delete fail');
              showMessage('Delete error!');
            }
          });
          request.error(function() {
            console.log('delete fail');
            showMessage('Delete error!');
          });
          break;
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
          showMessage('No internet connection!');
        }
      },
      success: function() {
        getInboxData();
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
