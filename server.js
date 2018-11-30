var express    = require("express");
var login = require('./routes/loginroutes');
var solution = require('./routes/usersolroutes');
var addQue = require('./routes/addQuestions');
var index = require('./routes/index')
var questions = require('./routes/questions')
var progress = require('./routes/progress')


var back = require('./routes/back');
var display = require('./routes/display');
var homepageOne = require('./routes/homepageOne')
var OneProfile = require('./routes/OneProfile')
var UserProfile = require('./routes/UserProfile')

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

app.use('/', index);
app.use('/questions', questions);
app.use('/login',login);
app.use('/addQue',addQue);
app.use('/solution',solution);
app.use('/back', back);
app.use('/leaderboard', display);
app.use('/home',homepageOne);
app.use('/editprofile', OneProfile);
app.use('/user', UserProfile);

app.listen(8080);
