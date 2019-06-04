'use strict';
angular.module('myApp.pages.dashboard', ['ngRoute','ui.bootstrap','myApp.data-access'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'pages/dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])
.controller('DashboardCtrl', function($scope,parkingSpace,$location,sharedProperties) {
	var data = [];  
	$scope.typeOfParking = ["Short Type Parking","Long Type Parking"];
	parkingSpace.fetchData()
	.success(function(dataSuccess){
    	angular.forEach(dataSuccess.features, function(obj) {
	  	  //derive an array of records with required data set
			  data.push({
	  		coordinates: obj.geometry.coordinates,
	    	Name: obj.properties.layers["parking.garage"].data.Name,
	      PubDate: obj.properties.layers["parking.garage"].data.PubDate,
	      Type: obj.properties.layers["parking.garage"].data.Type,
	      State: obj.properties.layers["parking.garage"].data.State,
	      FreeSpaceShort: obj.properties.layers["parking.garage"].data.FreeSpaceShort,
	      FreeSpaceLong: obj.properties.layers["parking.garage"].data.FreeSpaceLong,
	      ShortCapacity: obj.properties.layers["parking.garage"].data.ShortCapacity,
	      LongCapacity: obj.properties.layers["parking.garage"].data.LongCapacity
			});
		});
    $scope.dataSet = data;
    ;
    $scope.changeView = function(view,selectedValue){
    	;
    	$location.path(view);
    	sharedProperties.setProperty(selectedValue);
    	//send data as is and then in map controller derive co-ordinates and show its properties
    	sharedProperties.setCoordinates(data)
    }
    // set selcted Garage which has all records for the particular parking location chosen
    $scope.selectedGarage = function(value){
    	sharedProperties.setSelectedGarage(value);
    }
	})
	.error(function(){
		console.log("Error Occured")
	});
});

