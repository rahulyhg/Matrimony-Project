module.controller("SearchController", function($scope, $rootScope, $timeout, $http) {
  reloadScript();


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
