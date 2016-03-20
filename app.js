// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// CONTROLLERS
weatherApp.controller('HomeController', ['$scope', '$filter', 'cityService', '$location', 'daysService', '$timeout', function($scope, $filter, cityService, $location, daysService, $timeout){
    $scope.greeting = "Olly's weather app!";
    $scope.days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    $scope.selectedDay = $scope.days[0];
    $scope.city = cityService.city;

    $scope.myName = "Olly"
    $scope.characters = 5;

   $timeout(function(){
        console.log("changed");
        $scope.myName = "Changed";
    }, 3000);

    $scope.convertToLowercase = function(){
        return $filter("lowercase")($scope.myName);
    }

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

weatherApp.controller('UsersController', ['$scope', 'usersService', function($scope, usersService){

    $scope.users = usersService.query();

    $scope.removeUser = function(userId){
        usersService.removeUser({user: userId}).$promise.then(function(){
            var index = _.findIndex($scope.users, { "id": userId });
            $scope.users.splice(index, 1);
        });

    };
    
    $scope.editUser = function(userId, name, email){
        usersService.editUser({user: userId},{name: name, email: email})
    }

    $scope.addUser = function(name, email){
        usersService.save({name: name, email: email}).$promise.then(function(data){
            $scope.users.push({id: data.id, name: data.name, email: data.name})
        });
    }

    $scope.editMode = false;

    $scope.activateEditMode = function(){
        if($scope.editMode != true){
            $scope.editMode = true;
        } else {
            $scope.editMode = false;
        }
    }



}])

// SERVICES

weatherApp.service('usersService', ["$resource", function($resource){

    return $resource('http://localhost:3000/users/:user',{user: "@user"}, {
        get: {isArray: false},
        refresh: {
            method: 'GET',
            isArray: true
        },
        removeUser:{
            method:'DELETE'
        },
        editUser:{
            method:'PATCH'
        }
    });

}]);

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
        when('/users', {
        templateUrl: 'pages/users.html',
        controller: 'UsersController'
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

