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
});

weatherApp.directive("playComponent", function(){
    return {
        templateUrl: 'components/playComp.html',
        replace: false,
        scope: {
            personName: "@",
            personHobbies: "@"
        }
    }
})