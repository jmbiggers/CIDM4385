angular.module("ForecastApp",[])
    .controller("WeatherServiceController", ["$scope", "$http",
                "GoogleGeolocationService", "DarkSkyWeatherService",
        function($scope, $http, GoogleGeolocationService,
                  DarkSkyWeatherService){
        
            var wsc = this;
    
            //key = AIzaSyDRN3tGouY6_sdHZUvAfUkvfvP3AvKZQQE
    
            //app name
                wsc.app_name = "Weather App";
                
                wsc.selected_lat = 0;
                wsc.selected_lon = 0;
                
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
                    
                    wsc.selected_city.lat = wsc.selected_lat;
                    wsc.selected_city.lon = wsc.selected_lon;
                    
                    //var google_static_maps_key = "AIzaSyAQLfAsdHWVIYNsc-0AeaenZosMkDrGTsQ"
                    var google_static_maps_key = "AIzaSyAQLfAsdHWVIYNsc-0AeaenZosMkDrGTsQ";
                    wsc.google_static_maps_url = "https://maps.googleapis.com/maps/api/staticmap?center="+
                                                 wsc.selected_lat + ", " +
                                                 wsc.selected_lon + 
                                                 "&zoom=10&size=600x300&key=" +
                                                 google_static_maps_key;
                                                 
                    console.log("Google Static Map API URL");
                    console.log(wsc.google_static_maps_url);
                    
                    //console.log(res);
                    
                    wsc.getCurrentConditions();
                    
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            };
            
            wsc.getCurrentConditions = function(){
              DarkSkyWeatherService.getCurrentConditions(wsc.selected_city)
              .then(function(res){
                 console.log(res);
                 //get the weather stuff here
                 wsc.observation_time = new Date(res.data.currently.time);
                 wsc.dewpoint = res.data.currently.dewpoint;
                 wsc.temperature = res.data.currently.temperature;
                 wsc.windSpeed = res.data.currently.windSpeed;
                 wsc.windBearing = res.data.currently.windBearing;
                 
                 
              })
              .catch(function(err){
                  console.log(err);
              });
            };
            
            wsc.selected_city = wsc.cities[0];
            wsc.getLatLonForSelected();

            
    }])
    
    .directive('myConditionsSpecial', ['$sce', function($sce) {
        
        return{
            restrict: 'E',
            scope: true,
            templateURL: $sce.trustAsResourceUrl('currentCnditions.html')
        }
    }])
    // Get the location information from the Google API service\\
    .factory('GoogleGeolocationService', ['$sce','$http', 
        function($sce, $http){
            //https://docs.angularjs.org/api/ng/service/$sce
            
            var geolocationService = {}; // making an idependent object to be inserted into a controller here.
            
            // Google Maps API key
            var key = "AIzaSyDRN3tGouY6_sdHZUvAfUkvfvP3AvKZQQE";
            
            geolocationService.geoLocate = function(location){
                
                var address = "+" + location.street + ",+" + location.name + ",+" + 
                              location.state;
                var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                          address + "&key=" + key;
                
                var trustedurl = $sce.trustAsResourceUrl(url);
                return $http.get(trustedurl);
            }

        return geolocationService;

    }])
    // Callint the Darksky Service package api\\\
    .factory('DarkSkyWeatherService', ['$sce','$http',
        function($sce,$http){
            //work happens here
            var darkSkyWeatherService= {};
            
            //DarkSky API Key
            var key = "49b342198cf7d55da446774ff1a841f2";
            
            darkSkyWeatherService.getCurrentConditions = function(location){
                var url = "https://api.darksky.net/forecast/" + key + "/" +
                location.lat + "," + location.lon;
                
                console.log("DarkSky API URL:")
                console.log(url);
                
                var trustedurl = $sce.trustAsResourceUrl(url);
                return $http.jsonp(trustedurl, {jsonpcallbackParam: 'callback'});
                
            }
        return darkSkyWeatherService;
    }]);