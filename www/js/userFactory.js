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

  return {
    ref : ref,
    truckRef : truckRef,
    addTruckToFirebase : addTruckToFirebase,
    uid: null
  };
})
.factory('Truck', function(){

  return {
    name: null
  };
});
