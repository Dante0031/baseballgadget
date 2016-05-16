var express = require('express');
var index = require('./routes/index');
var session = require('express-session');
var passport = require('passport');//Passport is authentication middleware for Node
var bodyParser = require('body-parser');
var localStrategy = require('passport-local').Strategy;
var pg = require('pg');

var app = express();

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/BaseballGadget';

//Returns middleware that only parses json
//Returns middleware that only parses urlencoded bodies.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static("server/public"));


//How long the app will stay open before it logs user off
app.use(session({
    secret: 'secret',
    key: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 600000, secure: false }
}));

//Session has to go first. Configures before initialize's
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);

//Serialize User
passport.serializeUser(function(user, done) {
    console.log('called serializeUser');
    done(null, user.id);
});

//Deserialize User
passport.deserializeUser(function(id, done) {
    console.log('called deserializeUser');
    pg.connect(connectionString, function (err, client) {

        var user = {};
        console.log('called deserializeUser - pg');
        var query = client.query("SELECT * FROM users WHERE id = $1", [id]);

        //below is consoling out 'row' which is an object of the users login info
        //I'm wondering if the "SELECT * FROM users WHERE id = $1" , [id] ...is what i'm looking for

        query.on('row', function (row) {
            console.log('User row', row);
            user = row;
            done(null, user);
        });



        // After all data is returned, close connection and return results
        query.on('end', function () {
            client.end();
            // return res.json(results);
        });
        // Handle Errors
        if (err) {
            console.log(err);
        }
    });
});

//Uses local strategy for username/password authentication
passport.use('local', new localStrategy({ passReqToCallback : true, usernameField: 'username' },
    function(request, username, password, done) {
       console.log('called local');

        pg.connect(connectionString, function (err, client) {

            console.log('called local - pg');

            var user = {};

            var query = client.query("SELECT * FROM users WHERE username = $1", [username]);

            query.on('row', function (row) {
                console.log('User obj', row);
                console.log('Password', password);
                user = row;
                if(password == user.password){
                    console.log('match!');
                    done(null, user);
                } else {
                    done(null, false, {message:'Incorrect username and password.'});
                }

            });
            // After all data is returned, close connection and return results
            query.on('end', function () {
                // client.end();
                // return res.json(results);
            });
            // Handle Errors
            if (err) {
                console.log(err);
            }
        });
    }));

//End of passport
app.get('/', function(request, response){
   response.sendFile(__dirname + "/public/views/index.html");
});

var server = app.listen(3000, function(request, response){
    var port = server.address().port;
    console.log("Listening of port", port);
});

