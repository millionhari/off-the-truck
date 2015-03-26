//This controller allows us to add and authenticate users
angular.module('offTheTruck.userCtrl', [])
.controller('UserController', ['$scope', 'User', 'Truck', '$state',
function($scope, User, Truck, $state){
  $scope.user = {};

  //Gain access to Firebase
  // var ref = new Firebase("https://offthetruck.firebaseio.com/");
  // var truckRef = new Firebase("https://offthetruck.firebaseio.com/Trucks");


  /*Add truck adds a truck to our Firebase collection.
  We initialize lat/long to null but it is updated when they are 'ready' to serve.*/
  $scope.addTruckToFirebase = function(user){
    User.addTruckToFirebase(user);
  };

  //This is boilerplate log-in code made available to us from Firebase.
  $scope.authUser = function(user){
    User.ref.authWithPassword({
      email: user.email,
      password: user.password
    },
    function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        $scope.notUser = true;
      } else {
        User.setUserIdAndTruckName(authData);
      }
    });
  };


  /*This code allows us to add a user to our Firebase. Firebase keeps tracks of users
  and passwords out of sight automatically, ensuring hashing and strong auth*/
  $scope.addUser = function(user){
    /*createUser is a method made available to us by Firebase, automatically creating users.
    The only data it can take is email and password.*/
    User.ref.createUser({
     email: user.email,
     password: user.password
    },
    function(error, userData) {
     if(error){
      console.log("Error creating user:", error);
      $scope.notUniqueEmail = true;
     } else {
      console.log("Successfully created user account with uid:", userData.uid);
      //We add the user to our userID object for use later in our app
      $scope.user.uid = userData.uid;
      //Once an account is created, we then add a truck to our Trucks database
      $scope.addTruckToFirebase(user);
      /*Once we add the truck to our database, we log them in. Creating a user and logging them in
      are different things in Firebase. Auth user is standard code.*/
      $scope.authUser(user);
     }
    });
  };
}]);
