'use strict';

angular.module('myApp.pages.map',['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/map', {
      templateUrl: 'pages/map/map.html',
      controller: 'MapCtrl'
    });
  }])
  .controller('MapCtrl', function($scope,sharedProperties) {
    ;
    var fillColor;
    var radius;
    var totalSpace;
    var freeSpace;

    var garageDetails = sharedProperties.getSelectedGarage();
    $scope.parkingType = sharedProperties.getProperty();
    $scope.parkingLocation = garageDetails.Name;
    var mapData =sharedProperties.getCoordinates();
    var mapDiv = document.getElementById('map');
    //store selected garage's free and actual capacity for parking
     if($scope.parkingType == "Short Type Parking"){
        totalSpace = garageDetails.ShortCapacity;
        freeSpace = garageDetails.FreeSpaceShort;
      }else{
        totalSpace = garageDetails.LongCapacity;
        freeSpace = garageDetails.FreeSpaceLong;
      }
    // show the selected parking location at center
    var map = new google.maps.Map(mapDiv,{
      center: {lng: garageDetails.coordinates[0], lat: garageDetails.coordinates[1]},
      zoom: 14
    });

    for (var i=0;i<mapData.length;i++){
      // manage colors based on parking type and is availability
      if(($scope.parkingType == "Short Type Parking" && mapData[i].FreeSpaceShort == 0) || ($scope.parkingType == "Long Type Parking" && mapData[i].FreeSpaceLong == 0)){
        fillColor = "#FF0000";
      }
      else{
        fillColor = "#006400";
      }

      if(mapData[i].Name == garageDetails.Name){
        radius = 100;
      }
      else{
        radius = 50;
      }
      // form a circle and fill it with properties
      var circle = new google.maps.Marker({
        position: {lng: mapData[i].coordinates[0] ,lat: mapData[i].coordinates[1]}, 
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8.5,
          fillColor: fillColor,
          fillOpacity: 0.4,
          strokeWeight: 0.4
        }
      });

    google.maps.event.addListener(circle, "click", function(event) {
      debugger;
      // show location information and other details when clicked on circles(available location) in map
      angular.forEach(mapData, function(value, key) {
         if(event.latLng.lat() == value.coordinates[1]){
            if($scope.parkingType == "Short Type Parking"){
              infoWindow.setContent("Total space:"+value.ShortCapacity+'&nbsp;'+"Available Space:"+value.FreeSpaceShort);
            }
            else{
              infoWindow.setContent("Total space:"+value.LongCapacity+'&nbsp;'+"Available Space:"+value.FreeSpaceLong);
            }
            infoWindow.setPosition(event.latLng); 
            infoWindow.open(map);
          }
      });
    });
    }
    // Map resize its dimensions and focus at center at any view port
    google.maps.event.addDomListener(window, "resize", function() {
      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center); 
    }); 

    //create info window
    var infoWindow= new google.maps.InfoWindow({
      content: "Total space:"+totalSpace+'&nbsp;'+"Available Space:"+freeSpace
    });
    // by default open this widow with statistics chosen when map is loaded
    infoWindow.open(map);
    infoWindow.setPosition(map.center);

    //jumo to selected location if user has clicked on other marks as well
    $scope.jumpToSelectedLocation = function(){
      infoWindow.setContent("Total space:"+totalSpace+'&nbsp;'+"Available Space:"+freeSpace);
      var latlng = new google.maps.LatLng(garageDetails.coordinates[1], garageDetails.coordinates[0]);
      console.log(garageDetails.coordinates[1] +"-------"+ garageDetails.coordinates[0])  
      infoWindow.setPosition(latlng);
      map.setCenter(latlng);
    }
});
  
