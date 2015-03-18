//Map controller

angular.module('offTheTruck.mapCtrl', [])

.controller('mapCtrl', function($scope){
  var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
   
  var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map-container"), mapOptions);

  navigator.geolocation.getCurrentPosition(function(pos) {
      map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      var myLocation = new google.maps.Marker({
          position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
          map: map,
          title: "My Location"
      });
  });

  $scope.map = map;
});