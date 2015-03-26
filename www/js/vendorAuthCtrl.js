angular.module('offTheTruck.vendorAuthCtrl', [])
.controller('VendorAuthCtrl', ['$scope', 'VendorAuth', function($scope, VendorAuth) {

  $scope.vendorAuth = {};
  $scope.notUniqueEmail = false;
  $scope.notUser = false;

  // Signup a new vendor
  $scope.signupVendor = function(vendor) {
    VendorAuth.signupVendor(vendor);
    $scope.vendorAuth = VendorAuth.vendorAuthRef;
    $scope.notUniqueEmail = VendorAuth.notUniqueEmail;
  };

  // Login an existing vendor
  $scope.loginVendor = function(vendor) {
    VendorAuth.loginVendor(vendor);
    $scope.vendorAuth = VendorAuth.vendorAuthRef;
    $scope.notUser = VendorAuth.notUser;
  };

}]);
