// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// CONTROLLERS
weatherApp.controller('HomeController', ['$scope', 'cityService', '$location', function($scope, cityService, $location){
    $scope.greeting = "Olly's weather app!";
    $scope.days = [1,2,3,4,5];
    $scope.selectedDay = $scope.days[0];
    $scope.city = cityService.city;

    $scope.startSearch = function(){
        $location.path('/forecast')
    }

    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });
}]);

weatherApp.controller('ForecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService){
    $scope.heading = "The forecast"
    $scope.city = cityService.city;

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?APPID=2303473530dc8817a6b6bd8fc53a9b13", {
        callback: "JSON_CALLBACK"}, { get: { method: "JSONP" }});

    $scope.weatherResult = $scope.weatherAPI.get({
        q: $scope.city,
        cnt: 3
    });

}]);

// SERVICES
weatherApp.service('cityService',[function() {

    this.city = "London";

}]);

//ROUTES
weatherApp.config(['$routeProvider',
function($routeProvider){
    $routeProvider.
        when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'ForecastController',
    }).
        when('/home', {
        templateUrl: 'pages/home.htm',
        controller: 'HomeController'
    }).
        otherwise({
        redirectTo: '/home'
    })
}]);


