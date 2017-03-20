angular.module("ForecastApp", [])
    .controller("WeatherServiceController", ["$scope", "$http", 
        "GoogleGeolocationService", 
        function($scope, $http, GoogleGeolocationService){
	   
            var wsc = this;
            
            wsc.selected_lat = 0;
            wsc.selected_lon = 0;
        
            //key: sdfgsde5dfgsdfg34tsdfg

            //App name    
            wsc.app_name = "Weather App";
        
            wsc.cities = 
            [
                {
                    name: "Canyon",
                    street: "2403 Russell Long Blvd.",
                    url_name: "Canyon",
                    state: "TX",
                    lat: 0,
                    lon: 0
                },            
                {
                    name: "Amarillo",
                    url_name: "Amarillo",
                    state: "TX",
                    lat: 0,
                    lon: 0
                }, 
                {
                    name: "Anchorage",
                    url_name: "Anchorage",
                    state: "AK",
                    lat: 0,
                    lon: 0
                },
                {
                    name: "Denver",
                    url_name: "Denver",
                    state: "CO",
                    lat: 0,
                    lon: 0
                }
            ];
            
            wsc.getLatLonForSelected = function(){
                GoogleGeolocationService.geoLocate(wsc.selected_city)
                    .then(function(res){
                        wsc.selected_lat = res.data.results[0].geometry.location.lat;
                        wsc.selected_lon = res.data.results[0].geometry.location.lng;
                        
                    //var google_static_maps_key = "AIzaSyAVIugWFEfJlG9Y5HS-kkkoQISjDNWWDtM";
                    var google_static_maps_key = "AIzaSyC4tT_4VUXDbiSLz_AJVuTLDOzewjj7O9A";
                    
                    wsc.google_static_maps_url = "https://maps.googleapis.com/maps/api/staticmap?center=" +
                                                 wsc.selected_lat + "," +
                                                 wsc.selected_lon + 
                                                 "&zoom=10&size=600x300&key=" +
                                                 google_static_maps_key;
                                                 
                    console.log("Google Static Map API URL");
                    console.log(wsc.google_static_maps_url);                        
                        
                        console.log(res);
                    }).
                    catch(function(err){
                        console.log(err);
                    });
            }
            
            wsc.selected_city = wsc.cities[0];
            wsc.getLatLonForSelected();
            
    }])
    .factory('GoogleGeolocationService', ['$sce', '$http', 
        function($sce, $http){
            //https://docs.angularjs.org/api/ng/service/$sce
            
            var geolocationService = {};
            
            //Google Maps Geocoding API key   
            var key = "AIzaSyC4tT_4VUXDbiSLz_AJVuTLDOzewjj7O9A";
            
            geolocationService.geoLocate = function(location){

                var address = "+" + location.street + ",+" + location.name + ",+" + 
                              location.state;
                var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                          address + "&key=" + key;

                var trustedurl = $sce.trustAsResourceUrl(url);
                return $http.get(trustedurl);
            }
            
            return geolocationService;            
            
        }]);

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    