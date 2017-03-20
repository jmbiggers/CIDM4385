var unitConverter = angular.module("UnitConverter",[]);

// conversion rate and UI site: http://convert.french-property.co.uk/

unitConverter.controller('UnitConverterController', [
	'$scope', function($scope){
	var ucc = this;
	
	//attributes
	ucc.lengthValue = 0;
	
	
	
	ucc.metricVolumeUnits =
    [
        {
            unit_name: "Cubic Centimeters",
            unit_code: "cm3",
            type: "metric"
        },
        {
            unit_name: "Cubic Decimeters",
            unit_code: "dm3",
            type: "metric"
        },
        {
            unit_name: "Cubic Meters",
            unit_code: "m3",
            type: "metric"
        },
        {
            unit_name: "Litres",
            unit_code: "l",
            type: "metric"
        },        
        {
            unit_name: "Hectolitres",
            unit_code: "hl",
            type: "metric"
        },
    ];
	
	function lengthUpdated(){
		console.log(ucc.lengthValue);
	}
	
	$scope.$watch('ucc.lengthValue', lengthUpdated)
	
	ucc.selected_unit = ucc.metricVolumeUnits[0]
	
	ucc.showSelectedUnit = function(){
	console.log(ucc.selected_unit.unit_name)
	}

	//behaviors

	}

]);
