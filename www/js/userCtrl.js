angular.module('offTheTruck.userCtrl', [])
.controller('UserController', ['$scope', '$window', '$state', 
function($scope, $window, $state){
    $scope.user = {};
    var ref = new Firebase("https://off-the-truck.firebaseio.com/");
    var truckRef = new Firebase("https://off-the-truck.firebaseio.com/Trucks");
     
    $scope.addTruck = function(user){
      truckRef.child(user.truckname).set({
        truckname: user.truckname,
        email: user.email,
        isServing: false,
        lat: null,
        long: null
      });
    };

    $scope.authUser = function(user){
    ref.authWithPassword({
      email: user.email,
      password: user.password
    }, 
    function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $window.localStorage.setItem('truckname', user.truckname);
        console.log("This is our window: ", $window.localStorage.getItem('truckname'));
        $scope.addTruck(user);
        $state.go('vendor');
      }
    });
    };

    $scope.addUser = function(user){
      ref.createUser({
       email: user.email,
       password: user.password
      }, 
      function(error, userData) {
       if(error){
        console.log("Error creating user:", error);
       } else {
        console.log("Successfully created user account with uid:", userData.uid);
        $scope.authUser(user);
       }
      });
    };
}]);