angular.module('offTheTruck.vendorCtrl', [])

.controller('vendorCtrl', ['$scope', '$VendorAuth', 'Vendor', function($scope, VendorAuth, Vendor){
  
  $scope.vendor = VendorAuth.truckRef;
  $scope.statusText = 'Not Serving';
  $scope.notEditable = true;

  // a function that toggles notEditable
  $scope.toggleEditable = function(){
    $scope.notEditable = $scope.notEditable ? false : true;
  }

  // set a vendor's information
  $scope.saveProfile = function(){
    // pass this to factory. if it's succesful, communicate success if error, tell user and log it
    Vendor.updateTruck($scope.vendor);
  }

  $scope.setStatusText = function(){
    // check isServing
    // set status text accordingly
    if($scope.vendor.isServing){
      $scope.statusText = 'Serving';
    } else {
      $scope.statusText = 'Not Serving';
    }
  }

  // updates the status of the vendor
  $scope.updateIsServing = function(){
    if ($scope.vendor.isServing) {
      Vendor.getLocation($scope.vendor);
    } else {
      Vendor.stopServe($scope.vendor);
    }
    $scope.setStatusText();
  }

  $scope.setStatusText();

}]);

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

  // method to toggle isServing - 

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
