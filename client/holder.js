///**
// * Created by NathanBriscoe on 2/14/16.
// */
//app.controller('GameTime', ['$scope', '$http', function($scope, $http){
//    var batter = "";
//
//    var atBat = {
//        pitcher: "",//lefty or righty?
//        hit: "",//was it a hit? what kind?
//        out: "" //was it an out? what kind?
//    };
//    var pitches = {
//        pitch_type: [],//What type of pitch was it?
//        pitch_result: []//Was it a ball, strike, or foul?
//    };
//
//    $scope.changeColor = function(color){
//        ballColor = color;
//        baseball.pitch_type = "Fastball";
//        return ballColor;
//    };
//    $scope.pitchResult = function(pitch){
//        ballIcon = pitch;
//        //baseball.pitch_result = "";
//        return ballIcon;
//    };
//
//    var ballIcon = $scope.pitchResult;
//    var ballColor = $scope.changeColor;
//    var baseball = {};
//
//    var createBaseball = function (canvas, plotX, plotY) {
//
//        var context = canvas.getContext('2d');
//        //var ballColor =
//
//
//        context.clearRect(0, 0, canvas.width, canvas.height);
//
//        context.stroke();//commenting this out to test what it's doing. If ball doesn't appear, uncomment.
//
//        //context.fillText(ballIcon);//took out "plotX, plotY, 10, 25", to test ballIcon
//        context.fillText(ballIcon, plotX, plotY);
//
//        context.beginPath();
//        context.arc(baseball.x,baseball.y,10,0,2*Math.PI);//shape of the ball
//        context.strokeStyle="red";//outline color of the ball
//        context.font = '8pt Calibri';//this is the text font of the ball
//        context.fillStyle = ballColor;//the color of the ball
//    };
//
//
//    var getBaseballPos = function (canvas, evt) {
//        var rect = canvas.getBoundingClientRect();
//        baseball.x = evt.clientX - rect.left;
//        baseball.y = evt.clientY - rect.top;
//    };
//
//    var canvas = document.getElementById('myCanvas');
//
//    $scope.fireClickEvent = function(evt){
//        getBaseballPos(canvas, evt);
//        var plotX = baseball.x;
//        var plotY = baseball.y;
//        createBaseball(canvas, plotX, plotY);
//        console.log('pitch', plotX, plotY);
//    };
//
//}]);
//
//
//
//
//////$("#circles_container").on("click", "#circles_canvas", function(event) {
////    //var canvas = document.getElementById('circles_canvas');
////    if (canvas.getContext) {
////        //var ctx = canvas.getContext("2d");
////        var w = 16;
////        var x = event.pageX;
////        var y = Math.floor(event.pageY-$(this).offset().top);
////        ctx.beginPath();
////        //ctx.fillStyle = ballColor;
////        ctx.arc(x, y, w/2, 0, 2 * Math.PI, false);
////        ctx.fill();
////
////
////        //ctx = canvas.getContext("2d");
////        //ctx.font = '8pt Calibri';
////        ctx.fillStyle = 'white';
////        ctx.textAlign = 'center';
////        ctx.fillText('ballIcon', x, y+3);
////    }
////});
//
//
///////////////////////////////////////////////////////CONTROLLER FOR CREATING PLAYER/////////////////////////////////////




