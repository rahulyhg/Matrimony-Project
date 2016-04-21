module.controller("SearchController", function($scope, $rootScope, $timeout, $http) {
  $scope.userName = window.localStorage.getItem("username");
  reloadScript();
  $scope.searchResult = "";
  var name = '';
  var gender = '';
  var minAge = '';
  var maxAge = '';
  var country = '';
  var cityStates = '';
  var motherTongue = '';
  var marrialStt = '';
  var religion = '';
  var caste = '';
  var literacy = '';
  function resetAll() {
    $('#txtName').val('');
    $("#txtGender").prop('selectedIndex',0);
    $("#txtCountry").prop('selectedIndex',0);
    $("#txtState").prop('selectedIndex',0);
    $('#txtMinAge').val(16);
    $('#txtMaxAge').val(80);
    $("#txtMotherTongue").prop('selectedIndex',0);
    $("#txtMarial").prop('selectedIndex',0);
    $("#txtReligion").prop('selectedIndex',0);
    $("#txtCaste").prop('selectedIndex',0);
    $("#txtLitteracy").prop('selectedIndex',0);
  }
  // View detail
  $scope.viewDetail = function (index) {
    var selectedUser = $scope.searchResult[index];
    $rootScope.selectedUser = selectedUser;
    $scope.navi.pushPage('detail.html');
  };
  // re-search
  $scope.reRearch = function () {
    $scope.searchResult = "";
    resetAll();
    $('#noResult').hide();
    $('#searchContent').show();
  };
  // Search
  $scope.searchButtonHandler = function () {
    // var minAge = parseInt($('#txtMinAge').val());
    name = $('#txtName').val();
    gender = $("#txtGender option:selected").val();
    minAge = $('#txtMinAge').val();
    maxAge = $('#txtMaxAge').val();
    country = $("#txtCountry option:selected").val();
    cityStates = $("#txtState option:selected").val();
    motherTongue = $("#txtMotherTongue option:selected").val();
    marrialStt = $("#txtMarial option:selected").val();
    religion = $("#txtReligion option:selected").val();
    caste = $("#txtCaste option:selected").val();
    literacy = $("#txtLitteracy option:selected").val();
    console.log(gender);
    checkName();
    checkCountryState();
    checkAgeval();
    if (checkAge()) {
      checkConnection();
    }
  };
  // Call to server
  function callToServer() {
    console.log('searching...');
    $('#searchContent').hide();
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/search.php",
      data: {
        userName: $scope.userName,
        name: name,
        gender: gender,
        minAge: minAge,
        maxAge: maxAge,
        country: country,
        cityStates: cityStates,
        motherTongue: motherTongue,
        marrialStt: marrialStt,
        religion: religion,
        caste: caste,
        literacy: literacy
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      $scope.searchResult = data;
      console.log('number of result = '+$scope.searchResult.length);
      if ($scope.searchResult.length==0) {
        $('#noResult').show();
      }else {
        $scope.searchResult = data;
        for (var i = 0; i < $scope.searchResult.length; i++) {
          var unformatedUrl = $scope.searchResult[i]["avatarUrl"];
          var formatedUrl = unformatedUrl.replace("?", "%3f");
          $scope.searchResult[i]["avatarUrl"] = formatedUrl;
          var unformatedCoverUrl = $scope.searchResult[i]["coverImageUrl"];
          var formatedCoverUrl = unformatedCoverUrl.replace("?", "%3f");
          $scope.searchResult[i]["coverImageUrl"] = formatedCoverUrl;
        }
        $('#searchResultList').attr('display','block');
      }
    });
  }
  // Check name
  function checkName() {
    if (name == "") {
      name = "any";
    }
  }
  // check country and state
  function checkCountryState() {
    if (country== -1) {
      country = "any";
    };
    if (cityStates === undefined || cityStates == "") {
      cityStates = "any";
    }
  }
  // check age
  function checkAge() {
    if (minAge >= maxAge) {
      showMessage('Max age can not large than min age');
      return false;
    }else if (minAge < 16) {
      showMessage('Min age can not < 16');
      return false;
    }else if (maxAge > 80 || maxAge < 16) {
      showMessage('Max age only in rage 16 - 80');
      return false;
    }else {
      return true;
    }
  };
  // check null age
  function checkAgeval() {
    if (minAge == "" && maxAge == "") {
      minAge = 16;
      maxAge = 80;
    };
    if (minAge == "") {
      minAge = 16;
    };
    if (maxAge == "") {
      maxAge = 80;
    }
  };
  // show error
  function showMessage(mess) {
    $scope.errorContent = mess;
    $('top-notification-2, top-notification, bg-red-dark, timeout-notification, timer-notification').slideUp(200);
    $('#error').slideDown(200);
    setTimeout(function(){
      $('#error').slideUp(200);
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
  // Reload jquery scripts
  function reloadScript() {
    $.when(
      $.getScript( "lib/matterTheme/scripts/jquery.js" ),
      $.getScript( "lib/matterTheme/scripts/jqueryui.js" ),
      $.getScript( "lib/matterTheme/scripts/framework-plugins.js" ),
      $.getScript( "lib/matterTheme/scripts/custom.js" ),
      $.getScript( "js/countries.js" ),
      $.Deferred(function( deferred ){
        $( deferred.resolve );
      })
    ).done(function(){
      populateCountries("txtCountry", "txtState");
      console.log('script reloaded!');
    });
  }
});
