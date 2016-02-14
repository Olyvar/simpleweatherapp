// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// CONTROLLERS
weatherApp.controller('HomeController', ['$scope', 'cityService', '$location', 'daysService', function($scope, cityService, $location, daysService){
    $scope.greeting = "Olly's weather app!";
    $scope.days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    $scope.selectedDay = $scope.days[0];
    $scope.city = cityService.city;

    $scope.submit = function(){
        $location.path('/forecast/' + $scope.selectedDay)
    }

    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });

    $scope.$watch('selectedDay', function(){
        daysService.day = $scope.selectedDay;
    })
}]);

weatherApp.controller('ForecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){
    $scope.heading = "The forecast"
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || '2';

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=2303473530dc8817a6b6bd8fc53a9b13", {
        callback: "JSON_CALLBACK"}, { get: { method: "JSONP" }});

    $scope.weatherResult = $scope.weatherAPI.get({
        q: $scope.city,
        cnt: $scope.days
    });

    $scope.convertToCelsius = function(degK){
        return _.floor(degK - 273.15);
    }

    $scope.convertToDate = function(date){
        return new Date(date * 1000);
    }

}]);

// SERVICES
weatherApp.service('cityService',[function() {

    this.city = "London";

}]);

weatherApp.service('daysService', [function(){

    this.day = '1';

}]);

//ROUTES
weatherApp.config(['$routeProvider',
function($routeProvider){
    $routeProvider.
        when('/home', {
        templateUrl: 'pages/home.htm',
        controller: 'HomeController'
    }).
    when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'ForecastController',
    }).
    when('/forecast/:days', {
        templateUrl: 'pages/forecast.htm',
        controller: 'ForecastController',
    }).
        otherwise({
        redirectTo: '/home'
    })
}]);


// DIRECTIVES

weatherApp.directive("weatherComponent", function(){
    return {
        restrict: 'E',
        templateUrl: 'components/weatherComp.html',
        replace: true,
        scope: {
            weatherDay: "=",
            convertToStandard: "&",
            convertToDate: "&",
            dateFormat: "@"
        }
    }
})

