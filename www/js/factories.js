angular.module('offTheTruck.factories', [])
.factory('User', function(){
    //Gain access to Firebase
  var ref = new Firebase("https://offthetruck.firebaseio.com/");
  var truckRef = new Firebase("https://offthetruck.firebaseio.com/Trucks");

  var addTruck = function(user){
    truckRef.child(user.uid).set({
      truckname: user.truckname,
        email: user.email,
        isServing: false,
        lat: null,
        long: null
    });
  };

  return {
    uid: null
  };
})
.factory('Truck', function(){
  return {
    name: null
  };
});
