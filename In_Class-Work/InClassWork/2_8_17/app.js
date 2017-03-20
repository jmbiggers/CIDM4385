/*global angular*/
var myModule = angular.module('local_storage_app',[]);

myModule.controller('MyController', ['$scope', function($scope){
    
    
    var mc = this;
    
    mc.name = "Jeff";
    
}]);

myModule.factory("LocalStorageService", function($window, $rootScope){
   angular.element($window).on('storage',function(event){
     if(event.key == "my-storage") 
     $rootScope.$apply();
   })
    
});