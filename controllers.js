weatherApp.controller('HomeController', ['$scope', '$filter', 'cityService', '$location', 'daysService', function($scope, $filter, cityService, $location, daysService){
    $scope.greeting = "Olly's weather app!";
    $scope.days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    $scope.selectedDay = $scope.days[0];
    $scope.city = cityService.city;

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

weatherApp.controller('UsersController', ['$scope', 'usersService', 'postsService', '$location', '$routeParams', function($scope, usersService, postsService, $location, $routeParams){

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
        if(name && email){
            usersService.save({name: name, email: email}).$promise.then(function (data) {
                $scope.users.push({id: data.id, name: data.name, email: data.email})
            });
        }
    }

    $scope.editMode = false;

    $scope.user = usersService.getId({user: $routeParams.user});

    console.log($routeParams.user)

    $scope.activateEditMode = function(){
        if($scope.editMode != true){
            $scope.editMode = true;
        } else {
            $scope.editMode = false;
        }
    }

    $scope.viewUserInfo = function(userId){
        postsService.currentUserId = userId;
        $location.path('/postInfo/');
    }

}]);

weatherApp.controller('PostsController', ['$scope', 'postsService', function($scope, postsService){

    $scope.currentPostId = postsService.currentUserId;

    $scope.currentUserPosts = postsService.query({userId: $scope.currentPostId});

}]);

weatherApp.controller('PlaygroundController', ['$scope', function($scope){

    $scope.people = [{
        name: "Oliver Banham",
        hobbies: "Video games, movies, film",
        active: true
    },
    {
        name: "James Banham",
        hobbies: "Surfing, sport",
        active: false
    },
    {
        name: "Molly Banham",
        hobbies: "Coding, drawing",
        active: true
    }]

}])