// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('offTheTruck', [
  'ionic',
  'firebase',
  'offTheTruck.factories',
  'offTheTruck.mapCtrl',
  'offTheTruck.userCtrl'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('main', {
    url: '/main',
    templateUrl: 'view/main.html'
  })
  .state('signup', {
    url:'/signup',
    templateUrl: 'view/signup.html'
  })
  .state('user', {
    url: '/user',
    templateUrl: 'view/user-tabs.html'
  })
  .state('user.home', {
    url: '/home',
    views: {
      'home':{
        templateUrl: 'view/user-main.html',
        controller: 'mapCtrl'
      }
    }
  })
  .state('login', {
    url:'/login',
    templateUrl: 'view/login.html',
    controller: 'UserController'
  })
  .state('vendor', {
    url: '/vendor',
    templateUrl: 'view/vendor-main.html',
    controller: 'UserController'
  });

  $urlRouterProvider.otherwise('/main');
})

.controller('TruckController', ['$scope', "$firebaseObject",
  function($scope, $firebaseObject) {
     $scope.user = {};
     var ref = new Firebase("https://off-the-truck.firebaseio.com/Trucks");

     var obj = $firebaseObject(ref);

     $scope.trucks = obj;

     $scope.addUser = function(user){
      ref.child(user.truckname).set({
        truckname: user.truckname,
        email: user.email,
        password: user.password
      });
     };
   }])

.controller('TruckLocation', ['$scope', "$firebaseObject", 'User', 'Truck', '$state',
  function($scope, $firebaseObject, User, Truck, $state) {
    var ref = new Firebase("https://off-the-truck.firebaseio.com/Trucks");
    var loggedInTruck = User.uid;
    var currentTruck = ref.child(loggedInTruck);
    $scope.truckname = Truck.name;


    $scope.getLocation = function(){
      navigator.geolocation.getCurrentPosition(function(pos) {
        currentTruck.update({
          isServing: true,
          long: pos.coords.longitude,
          lat: pos.coords.latitude
        });
      });
    $state.go('user.home');
    };

    $scope.stopServe = function(){
      currentTruck.update({
        isServing: false
      });
    };
}]);
