var express = require('express');
var path = require('path');
var passport = require('passport');
var pg = require('pg');

var router = express.Router();

//var connectionString = process.env.DATABASE_URL || require(‘__’);// need help here figuring out what to do.
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/BaseballGadget';

////////////////////////////START OF PASSPORT///////////////////////////////////////////////////////////////////////////
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

//router.get('/success', function(request, response){
//    response.sendFile(path.join(__dirname, '../public/views/success.html'));
//});
//////////////////////////////////////////THIS IS LOGGING IN USER///////////////////////////////////////////////////////
router.post('/logIn', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login'
}));

////////////////////////////END OF PASSPORT/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////THIS IS CONNECTING TO POSTGRES AND ADDING NEW USER/////////////////////////////////////

router.post('/newEntry', function(request, response){
    console.log(request.body);
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




module.exports = router;



