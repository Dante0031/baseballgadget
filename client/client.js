var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl:'views/login.html',
            controller: 'MainController'
        })
        .when('/index', {
            templateUrl:'views/index.html',
            controller: 'signupCtrl'
        })
        .when('/gametime', {
            templateUrl:'views/gametime.html',
            controller: 'GameTime'
        })
        .when('/createplayer', {
            templateUrl:'views/createplayer.html',
            controller: 'CreatePlayer'
        })
        .when('/stats', {
        templateUrl:'views/stats.html',
        controller: 'statsController'
    });



    $locationProvider.html5Mode(true);
}]);

////////////////////////////////THIS IS THE CONTROLLER FOR THE USER'S LOGIN/////////////////////////////////////////////


app.controller('signupCtrl', ['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.username = "";
    $scope.password = "";
    $scope.firstname = "";
    $scope.lastname = "";
    $scope.email = "";

    $scope.signupSubmit = function(){
        $http.post('/newEntry', {username: $scope.username, password: $scope.password, firstname: $scope.firstname, lastname: $scope.lastname, email: $scope.email})
            .then(function(response){
            if(response.status === 200){
                //$location.path('/index');
                console.log('Registered successfully');
            } else {
                console.log("ERROR");
            }
        });
    };
}]);
//////////////////////////////////THIS IS THE CONTROLLER FOR _____________?/////////////////////////////////////////////

app.controller('MainController',['$scope', '$http','$location','pitchService', function($scope, $http, $location, pitchService){//ADD FACTORY HERE ALSO
    $scope.showLogIn = true;
    $scope.showMainPage = false;
    /////////////////////////////////////////////////////////////TESTING NG-SHOW CASE///////////////////////////////////
    $scope.username = "";
    $scope.password = "";
    //$scope.showLogIn = true;
    //$scope.showMainPage = false;

    $scope.loginSubmit = function(){
        $http.post('/logIn', {username: $scope.username, password: $scope.password})
            .then(function(response){
                if(response.status ===200){
                    console.log('Did we hit the got response?');
                    $scope.showLogIn = false;
                    $scope.showMainPage = true;//this SHOULD switch showMainPage from hide to show
                    //log into the factory here, i.e. NathanFactory.logIn();
                    $location.path('/mainpage');
                } else {
                    console.log("ERROR");
                }
            });
    };
}]);
/////////////////////////////////////////////////////CONTROLLER FOR SCATTER PLOT////////////////////////////////////////

app.controller('GameTime', ['$scope', '$http', 'pitchService', function($scope, $http, pitchService){

    ///////////////////////////////////////GLOBAL VARIABLES///////////////////////////////////////////
    var batter = "";

    var atBat = {
        pitcher: "",//lefty or righty?
        hit: "",//was it a hit? what kind?
        out: "" //was it an out? what kind?
    };
    var pitches = {
        pitch_type: [],//What type of pitch was it?
        pitch_result: []//Was it a ball, strike, or foul?
    };
    var baseball = {};
    var ballIcon = $scope.pitchResult;
    var ballColor = $scope.changeColor;


    $scope.changeColor = function(color){
        ballColor = color;
        return ballColor;
    };

    $scope.pitchResult = function(pitch){
        ballIcon = pitch;
        return ballIcon;
    };

    $scope.fireClickEvent = function(evt){
        getBaseballPos(canvas, evt);
        var plotX = baseball.x;
        var plotY = baseball.y;
        createBaseball(canvas, plotX, plotY);
    };

    var canvas = document.getElementById('myCanvas');
    var createBaseball = function (canvas, plotX, plotY) {
        var context = canvas.getContext('2d');
        if (canvas.getContext) {
            var w = 16;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.fillStyle = "blue";
            context.arc(baseball.x, baseball.y, w/2, 0, 2*Math.PI);
            context.fill();



            context = canvas.getContext("2d");

            context.font = '8pt Calibri';
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.fillText(pitchResult, baseball.x, baseball.y + 4);//"0", should be a variable that will change the Pitch Results
        }
    };
    var getBaseballPos = function (canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        baseball.x = evt.clientX - rect.left;
        baseball.y = evt.clientY - rect.top;
    };
}]);

/////////////////////////////////////////////////////CONTROLLER FOR CREATING PLAYER/////////////////////////////////////

app.controller('CreatePlayer', ['$scope', '$http', 'pitchService', function($scope, $http, pitchService){
    $scope.player = "";
    $scope.submitPlayer = function(){
        console.log("LOL");
    }
}]);

app.controller('statsController', ['$scope', '$http', 'pitchService', function($scope, $http, pitchService){


}]);


app.factory('pitchService', ['$http', function($http) {

    var batter = "";

    var atBat = {
        pitcher: "",//lefty or righty?
        hit: "",//was it a hit? what kind?
        out: "" //was it an out? what kind?
    };
    var pitches = {
        pitch_type: [],//What type of pitch was it?
        pitch_result: []//Was it a ball, strike, or foul?
    };

    var getPitchInfo = function() {
        $http.get('/index').then(function(response){
            data.pitchInfo = response.data;
        });
    };


    return {
        batter: batter,
        atBat: atBat,
        pitches: pitches,
        getPitchInfo: getPitchInfo
    };

}]);