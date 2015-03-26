// Vendor controller

angular.module('offTheTruck.vendorCtrl', [])

.controller('VendorCtrl', ['$scope', '$firebaseObject', 'Map', function($scope, $firebaseObject, Map){

  // We are storing the lat / long data in firebase, so we need reference to our firebase:
  var ref = new Firebase("https://offthetruck.firebaseio.com/Trucks");
  
  // This takes the boolean from the database and allows us to use it in the view
  console.log(ref);
  console.log(ref.isServing);
  $scope.isServing = ref.isServing;

  // This uses the $scope.isServing and outputs a string to display vendor status
  var currentStatus = function(){ 
    if($scope.isServing){
      return "Closed :("
    } else {
      return "Open!"
    }
  };

  // get vendor information

  // set vendor information

  // method to toggle isServing

  // method to set start time 
  
  // method to set end time

  // method to set map

  // upload/update image


  // This allows the ability to toggle between serving and not serving
  $scope.status = currentStatus();

  // This is how you create a new Google map
  var map = Map.getMap();

  // Gives our views access to the map data
  $scope.map = map;

  /* This storage object keeps track of the trucks that should be on the map. This is an object
  that sits client side and is updated whenever Firebase is updated.*/
  var vendor = {};

}]);
