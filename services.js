weatherApp.service('usersService', ["$resource", function($resource){

    return $resource('http://localhost:3000/users/:user',{user: "@user"}, {
        get: {isArray: false},
        getId: {
          method: 'GET'
        },
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

weatherApp.service('postsService', ["$resource", function($resource){
    this.currentUserId = null;

    return $resource('http://localhost:3000/posts/:post',{post: "@post"}, {
        get: {isArray: false}
    })
}]);


weatherApp.service('cityService',[function() {

    this.city = "London";

}]);

weatherApp.service('daysService', [function(){

    this.day = '1';

}]);