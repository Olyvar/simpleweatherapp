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
            templateUrl: 'pages/users.htm',
            controller: 'UsersController'
        }).
            when('/users/:user',{
            templateUrl: 'pages/user.htm',
            controller: 'UsersController'
        }).
        when('/postInfo', {
            templateUrl: 'pages/userPosts.htm',
            controller: 'PostsController'
        }).
            when('/playground', {
            templateUrl: 'pages/playground.htm',
            controller: 'PlaygroundController'
        }).
        otherwise({
            redirectTo: '/home'
        })
    }]);