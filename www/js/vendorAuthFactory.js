angular.module('offTheTruck.vendorAuthFactory', [])
.factory('VendorAuth', ['$state', function($state) {

  // Reference to Firebase data store
  // Used to create and access user accounts
  var ref = new Firebase("https://offthetruck.firebaseio.com/");

  // Reference to Trucks stored in the Firebase data store
  // Used to create a new Truck object upon signup
  var truckRef = new Firebase("https://offthetruck.firebaseio.com/Trucks");

  // Reference to the authenticated Vendor user
  var vendorAuthRef = {
    uid: null,
    truckName: null
  };

  var notUniqueEmail;
  var notUser;

  return {

    ref: ref,
    truckRef: truckRef,
    vendorAuthRef: vendorAuthRef,

    notUniqueEmail: notUniqueEmail,
    notUser: notUser,

    // Use the Firebase createUser method to create a new Vendor user in the data store
    // Assign the uid returned by the method to the vendorAuthRef object
    signupVendor: function(vendor) {

      /*createUser is a method made available to us by Firebase, automatically creating users.
      The only data it can take is email and password.*/
      ref.createUser({
        email: vendor.email,
        password: vendor.password
      },function(error, vendorData) {
          if(error){
            console.log("Error creating vendor:", error);
            notUniqueEmail = true;
          } else {
            console.log("Successfully created vendor account with uid:", vendorData.uid);
            //We add the user to our userID object for use later in our app
            vendorAuthRef.uid = vendorData.uid;

            //Once an account is created, we then add a truck to our Trucks database
            truckRef.child(vendorData.uid).set({
              truckName: vendor.truckName,
              email: vendor.email,
              isServing: false,
              lat: 0,
              long: 0
            });

            $state.go('login');
          }
        }
      ); 
    },

    // Use the Firebase loginVendor method to attempt to login Vendor user
    // Assign the uid returned by the method to the vendorAuthRef object
    loginVendor: function(vendor) {
      ref.authWithPassword({
        email: vendor.email,
        password: vendor.password
      },function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
            notUser = true;
          } else {

            //We save user ID to this variable, which is defined and controlled in the factory
            vendorAuthRef.uid = authData.uid;
            
            console.log('Vendor logged in successfully. uid: ', vendorAuthRef.uid);
            /*This code users user ID to reference our Firebase Trucks collection to find the name of the Truck associated with it.
            Snapshot is the JSON object that contains just the truck name*/
            truckRef.child(authData.uid).child('truckName').on('value', function(snapshot){
              vendorAuthRef.truckName = snapshot.val();
              //Then redirect user to the vendor page.
              $state.go('vendor');
            });
          }
        }
      );
    }
    
  };

}]);
