angular.module('offTheTruck.userCtrl', [])
.controller('UserController', ['$scope', 'User', 'Truck', '$state',
function($scope, User, Truck, $state){
    $scope.user = {};
    $scope.user.truckname = 'This is a test';
    var ref = new Firebase("https://off-the-truck.firebaseio.com/");
    var truckRef = new Firebase("https://off-the-truck.firebaseio.com/Trucks");


    $scope.addTruck = function(user){
      truckRef.child(user.uid).set({
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
        User.uid = authData.uid;
        truckRef.child(authData.uid).child('truckname').on('value', function(snapshot){
          Truck.name = snapshot.val();
          $state.go('vendor');
        });
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
        $scope.user.uid = userData.uid;
        $scope.addTruck(user);
        $scope.authUser(user);
       }
      });
    };
}]);
