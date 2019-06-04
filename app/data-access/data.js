
angular.module('myApp.data-access', [])
.service('parkingSpace', parkingSpace)
.service('sharedProperties',sharedProperties) 
// this service gets real time data -25 records
function parkingSpace($http){
	return{
		fetchData : function(){
		  return $http.get('http://api.citysdk.waag.org/layers/parking.garage/objects?per_page=25');
		}
	}
}
//this service is used to pass variables from one controller to another
function sharedProperties() {
	var property;
	var coordinates = [];
	var selectedGarage;
	return {
    getProperty: function () {
        return property;
    },
    setProperty: function(value) {
        property = value;
    },
    getSelectedGarage: function () {
        return selectedGarage;
    },
    setSelectedGarage: function(garageValue) {
        selectedGarage = garageValue;
    },
    getCoordinates: function(){
    	return coordinates;
    },
    setCoordinates: function(coord){
    	coordinates = coord;
    }
  }
}
