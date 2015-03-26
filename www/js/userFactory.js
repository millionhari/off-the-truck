angular.module('offTheTruck.userFactory', [])
.factory('User', function(){
  //Gain access to Firebase
  var ref = new Firebase("https://offthetruck.firebaseio.com/");
  var truckRef = new Firebase("https://offthetruck.firebaseio.com/Trucks");

  var addTruckToFirebase = function(user){
    truckRef.child(user.uid).set({
      truckname: user.truckname,
        email: user.email,
        isServing: false,
        lat: null,
        long: null
    });
  };

  var setUserIdAndTruckName = function(auth){
    //We save user ID to this variable, which is defined and controlled in the factory
    uid = auth.uid;

    /*This code users user ID to reference our Firebase Trucks collection to find the name of the Truck associated with it.
    Snapshot is the JSON object that contains just the truck name*/
    truckRef.child(auth.uid).child('truckname').on('value', function(snapshot){
      Truck.name = snapshot.val();
      //Then redirect user to the vendor page.
      $state.go('vendor');
    });
  }

  return {
    ref : ref,
    truckRef : truckRef,
    addTruckToFirebase : addTruckToFirebase,
  };
})
.factory('Truck', function(){

  return {
    name: null
  };
});
