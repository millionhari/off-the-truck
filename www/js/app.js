// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('offTheTruck', ['ionic', 'firebase', 'offTheTruck.mapCtrl'])

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
    templateUrl: 'view/login.html'
  })
  .state('vendor', {
    url: '/vendor',
    templateUrl: 'view/vendor-main.html'
  });


  $urlRouterProvider.otherwise('/main');
})
.controller('UserController', ['$scope', '$window',
  function($scope, $window){
     $scope.user = {};
     var ref = new Firebase("https://off-the-truck.firebaseio.com/");
     
     $scope.authUser = function(user){
      ref.authWithPassword({
        email    : user.email,
        password : user.password
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          $window.localStorage.setItem('userEmail', authData.password.email)
          console.log("This is our window: ", $window.localStorage.getItem('userEmail'));
          // $stateProvider.transitionTo('/vendor');
        }
      });
     };

     $scope.addUser = function(user){
       ref.createUser({
         email    : user.email,
         password : user.password
       }, function(error, userData) {
         if (error) {
           console.log("Error creating user:", error);
         } else {
           console.log("Successfully created user account with uid:", userData.uid);
           $scope.authUser(user);
         }
       });
     }
  }])
.controller('TruckController', ['$scope', "$firebaseObject", 
  function($scope, $firebaseObject) {
     $scope.user = {};
     var ref = new Firebase("https://off-the-truck.firebaseio.com/Trucks");

     var obj = $firebaseObject(ref);

     obj.$loaded().then(function() {
        console.log("loaded record:", obj);

       // To iterate the key/value pairs of the object, use angular.forEach()
       // angular.forEach(obj, function(value, key) {
       //    console.log(key, value);
       // });
     });

     $scope.trucks = obj;
     console.log("This is scope.trucks", $scope.trucks);
     // obj.$bindTo($scope, "trucks");
     // console.log("This is obj", obj);

     $scope.addUser = function(user){
      ref.child(user.truckname).set({
        truckname: user.truckname,
        email: user.email,
        password: user.password
      })
     };
   }])

.controller('TruckLocation', ['$scope', "$firebaseObject", 
  function($scope, $firebaseObject) {
    var ref = new Firebase("https://off-the-truck.firebaseio.com/Trucks");
    // var obj = $firebaseObject(ref);
    var currentTruck = ref.child("/newTruck123");

    // var updateRef = ref.child(user.truckname);

    $scope.getLocation = function(){
    console.log("You clicked the button!");
    console.log("This is the one truck", $firebaseObject(currentTruck));
      // console.log("This is the child e.g. user.truckname", user.truckname);

      navigator.geolocation.getCurrentPosition(function(pos) {
        currentTruck.update({
          "long": pos.coords.longitude,
          "lat": pos.coords.latitude
        })

          // var myLocation = new google.maps.Marker({
          //     position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
          //     map: map,
          //     title: "My Location"
          // });
      });

      
    }



}]);


