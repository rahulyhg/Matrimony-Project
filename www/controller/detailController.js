module.controller("DetailController", function($scope, $rootScope, $http) {
  reloadScript();
  getHobbyData();

  // Get user hobby
  function getHobbyData() {
    $scope.umovies = [];
    $scope.umusic = [];
    $scope.usport = [];
    $scope.uother = [];
    console.log('geting hobby...');
    var request = $http({
      method: "post",
      url: "http://139.59.254.92/gethobby.php",
      data: {
        userName: $rootScope.selectedUser.userName
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    /* Successful HTTP post request or not */
    request.success(function (data) {
      console.log(data);
      $scope.uhobby = data;
      console.log($scope.uhobby.length);
      for (var i = 0; i < $scope.uhobby.length; i++) {
        switch ($scope.uhobby[i].hobbyType) {
          case 'movies':
          $scope.umovies.push($scope.uhobby[i]);
          break;
          case 'music':
          $scope.umusic.push($scope.uhobby[i]);
          break;
          case 'sport':
          $scope.usport.push($scope.uhobby[i]);
          break;
          case 'other':
          $scope.uother.push($scope.uhobby[i]);
          break;
          default:

        }
      }
    });
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
