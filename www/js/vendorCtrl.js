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
    $scope.toggleEditable();
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

  // method to set start time   
  // method to set end time
  // method to set map

  $scope.setStatusText();

}]);
