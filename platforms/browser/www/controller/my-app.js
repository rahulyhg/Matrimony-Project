// Initialize your app
var myApp = new Framework7();
myApp.config = {
};

// Export selectors engine
var $$ = Dom7;

myApp.angular = angular.module('myApp', []);

myApp.fw7 = {
  app : new Framework7({
    animateNavBackIcon: true
  }),
  options : {
    dynamicNavbar: true,
    domCache: true
  },
  views : []
};

// Add view
var mainView = myApp.addView('.view-main', {
    // // Because we use fixed-through navbar we can enable dynamic navbar
    // dynamicNavbar: true
});
