var unitConverter = angular.module("UnitConverter", []);

/* conversion rates and UI idea from: http://convert.french-property.co.uk/ */

unitConverter.controller('UnitConverterController', [
	'$scope', function($scope){
		
		var ucc = this;
		
		//attributes
		ucc.lengthValue = 0;
		

		//cities to populate the drop-down box
		ucc.metric_volume_units = 
		[
			{
				unit_name: "Cubic Centimeters",
				unit_code: "cm3",
				type: "metic"
			},
			{
				unit_name: "Cubic Decimeters",
				unit_code: "dm3",
				type: "metic"
			},
			{
				unit_name: "Cubic Meters",
				unit_code: "m3",
				type: "metic"
			},
			{
				unit_name: "Liters",
				unit_code: "l",
				type: "metic"
			},	
			{
				unit_name: "Hectoliters",
				unit_code: "hl",
				type: "metic"
			}
		];		
		
		function lengthUpdated(){
			console.log(ucc.lengthValue);
		}
		
		$scope.$watch('ucc.lengthValue', lengthUpdated);
		
		ucc.selected_metric_volume_unit = ucc.metric_volume_units[0];
		
		//behaviors
		
		ucc.showSelectedUnit = function(){
			console.log(ucc.selected_metric_volume_unit.unit_name);
		}
		
	}
]);
