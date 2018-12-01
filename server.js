<<<<<<< HEAD
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/homepageOne');
const {editProfile} = require('./routes/OneProfile');
const {goBack} = require('./routes/back');
const {leaderBoard} = require('./routes/display');
const {singleProfile} = require('./routes/UserProfile');
//const {editProfile} = require('./routes/OneProfile');

const port = 8080;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'Munnym22_7',
    database: 'projecteuler'
});

// connect to database
db.connect((err) => {
   if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/view'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload


// routes for the app

app.get('/', getHomePage);
app.get('/editprofile', editProfile);
app.get('/back', goBack);
app.get('/leaderboard', leaderBoard)
app.get('/edit/:userId',singleProfile)
app.get('/return', getHomePage);

//app.get('/edit/:id', editUserPage);
//app.post('/edit/:id', editUser);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
=======
var express    = require("express");
var login = require('./routes/loginroutes');
var solution = require('./routes/usersolroutes');
var addQue = require('./routes/addQuestions');
var index = require('./routes/index')
var questions = require('./routes/questions')
var progress = require('./routes/progress')
<<<<<<< HEAD
=======
var solution = require('./routes/usersolroutes');
var getHomePage = require('./routes/mainpage');
var aboutPage = require('./routes/aboutlink');


var back = require('./routes/back');
var display = require('./routes/display');
var homepageOne = require('./routes/homepageOne')
var OneProfile = require('./routes/OneProfile')
var UserProfile = require('./routes/UserProfile')

>>>>>>> master
var requestSol = require('./routes/checkPointsForSolution')
var bodyParser = require('body-parser');
var path = require("path");
var app = express();
var fs = require('fs');
var multer = require('multer');
var busboy=require('connect-busboy');
var upload = multer({ dest: 'uploads/' });
var router = express.Router();
var async = require('async');
var mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();
app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');

<<<<<<< HEAD
app.set('view engine', 'ejs');

app.use('/', index);
app.use('/questions', questions);
=======
// app.use('/', index);
app.use('/questions', questions);
app.use('/login',login);
app.use('/addQue',addQue);

app.use('/solution',solution);
app.use('/back', back);
app.use('/leaderboard', display);
app.use('/home',homepageOne);
app.use('/editprofile', OneProfile);
app.use('/user', UserProfile);

app.use('/', getHomePage);
app.use('/about', aboutPage);
app.use('/exit', getHomePage);
>>>>>>> master

app.listen(8080);
>>>>>>> master
