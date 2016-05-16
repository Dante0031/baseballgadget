var express = require('express');
var path = require('path');
var passport = require('passport');
var pg = require('pg');

var router = express.Router();

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/BaseballGadget';

//Start of passport
router.get('/', function(request, response){
    var joinedPath = path.join(__dirname, '../public/views/index.html');
    console.log("joined path", joinedPath);
    response.sendFile(joinedPath);
});

router.get('/index', function(request, response){
    response.sendStatus(200);
});

router.get('/login', function(request, response){//changing '/fail' to '/login' to test ngshow case
    response.sendFile(path.join(__dirname, '../public/views/fail.html'));
});

//This is logging the user in
router.post('/logIn', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login'
}));


//This is connecting to postgres and adding new user
router.post('/newEntry', function(request, response){
    console.log("testing", request.body);
    var newUser = request.body;

    pg.connect(connectionString, function(err, client){

        client
            .query('INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5)', [newUser.username, newUser.password, newUser.firstname, newUser.lastname, newUser.email])
            .on('end', function(){
                client.end();
                return response.sendStatus(200);
            });
    })
});

//This is connecting to postgres and adding new player
router.post('/newPlayer', function(request, response){
    console.log(request.body);
    var newCreatedPlayer = request.body;

    pg.connect(connectionString, function(err, client){

        client
            .query('INSERT INTO players (users_id, first_name, last_name, secondary_position, primary_position, hitsfrom, throws, team_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [request.user.id, newCreatedPlayer.firstname, newCreatedPlayer.lastname, newCreatedPlayer.secondaryPosition, newCreatedPlayer.primaryPosition, newCreatedPlayer.hitsfrom, newCreatedPlayer.throws, newCreatedPlayer.teamname])
            .on('end', function(){
                client.end();
                return response.sendStatus(200);
            });
    })
});

///This is saving a created player to a logged in user
router.get('/getPlayer', function(request, response){
    console.log(request.body);
    var getPlayer = request.body;

    pg.connect(connectionString, function(err, client){

        client
            .query('SELECT first_name,last_name FROM addplayer', [getPlayer.firstname, getPlayer.lastname])
            .on('end', function(){
                client.end();
                return response.sendStatus(200);
            });
    })
});



module.exports = router;



