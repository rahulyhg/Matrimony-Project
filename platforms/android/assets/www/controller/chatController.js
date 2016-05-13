module.controller("ChatController", function($scope, $rootScope, $timeout, $http) {
  $scope.user = $rootScope.selectedUser.userName;
  $scope.nameOfUser = $rootScope.selectedUser.firstName + " " + $rootScope.selectedUser.lastName;
  $scope.userName = window.localStorage.getItem("username");
  $scope.sendMess = [];
  $scope.replyMess = [];
  $scope.mess = [];
  loadMessage();
  // updateData();
  // update data
  function updateData() {

    $timeout(function () {
      loadMessage();
      updateData();
    }, 10000);
  };
  $scope.rightButtonRematching = function () {
    $('#rightIcon').attr('spin','true');
    loadMessage();
    setTimeout(function(){
      $('#rightIcon').attr('spin','false');
    }, 1000);
  };
  // back
  $scope.backBtn = function () {
    navi.popPage();
  };
  // load message
  function loadMessage() {
    $scope.sendMess = [];
    $scope.replyMess = [];
    $scope.mess = [];
    getSendMessageList();
  }
  // sort message
  function sortMessage() {

    var minIdx, temp, len = $scope.mess.length;
    for (var i = 0; i < len; i++) {
      minIdx = i;
      for (var j = i+1; j < len; j++) {
        if ($scope.mess[j]["messageId"] < $scope.mess[minIdx]["messageId"]) {
          minIdx = j;
        }
      }
      temp = $scope.mess[i];
      $scope.mess[i] = $scope.mess[minIdx];
      $scope.mess[minIdx] = temp;
    }
    // console.log($scope.mess);
  }
  // get send message list
  function getSendMessageList() {
    console.log('geting message list...');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/getmesslist.php",
      data: {
        userName: $scope.userName,
        frUserName: $scope.user,
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      $scope.sendMess = data;
      for (var i = 0; i < $scope.sendMess.length; i++) {
        $scope.mess.push($scope.sendMess[i]);
      };
      sortMessage();
      getReplyMessageList();
    });
    request.error(function() {
      showMessage('Unable connect to load message, please check your internet connection!');
    });
  }
  // get reply message list
  function getReplyMessageList() {
    console.log('geting reply message list...');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/getmesslist.php",
      data: {
        userName: $scope.user,
        frUserName: $scope.userName,
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      $scope.replyMess = data;
      for (var i = 0; i < $scope.replyMess.length; i++) {
        $scope.mess.push($scope.replyMess[i]);
      }
      sortMessage();
      console.log('mess');
      console.log($scope.mess);
      $('#chatList').html('');
      for (var i = 0; i < $scope.mess.length; i++) {
        if ($scope.mess[i]["sendFrom"] == $scope.userName) {
          $('<em class="speach-left-title">you says:</em><p class="speach-left" id="'+i+'" onclick="showTime()">'+$scope.mess[i]["messageContent"]+'</p><em class="speach-left-title" id="date-time-'+i+'" style="display: none">'+$scope.mess[i]["messageDate"]+$scope.mess[i]["messageTime"]+'</em><div class="clear"></div>').appendTo('#chatList');
        }else {
          $('<em class="speach-right-title">'+$scope.user+' replied:</em><p class="speach-right blue-bubble" id="'+i+'" onclick="showTime()">'+$scope.mess[i]["messageContent"]+'</p><em class="speach-left-title" id="date-time-'+i+'" style="display: none">'+$scope.mess[i]["messageDate"]+$scope.mess[i]["messageTime"]+'</em>').appendTo('#chatList');
        }
      }
      $('#chatList').scrollTop($('#chatList')[0].scrollHeight);
    });
    request.error(function() {
      showMessage('Unable connect to load message, please check your internet connection!');
    });
  };

  // send message
  $scope.send = function (index) {
    console.log('sending....');
    var message = $('#txtMess').val();
    console.log('mess = '+message);
    if (message!='' or message!=null) {
      $('#txtMess').val('');
      console.log($scope.userName + $scope.user + message);
      var request = $http({
        method: "post",
        url: "http://139.59.254.92/sendMessage.php",
        data: {
          userName: $scope.userName,
          sendTo: $scope.user,
          message: message
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      /* Successful HTTP post request or not */
      request.success(function (data) {
        console.log(data);
        if (data=="success") {
          console.log('send success');
          loadMessage();
        }else if (data=="error") {

          console.log('send fail');
        }
      });
      request.error(function() {
        console.log('send fail');
        showMessage('Unable connect to send message, please check your internet connection!');
      });
    }else {
      showMessage("Your message can't empty!");
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
});
