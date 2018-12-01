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
app.set('view engine', 'ejs')
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();


router.get('/register', function(req, res) {
	res.sendFile(path.join(__dirname,'/view', '/registration.html'));
});

router.get('/login', function(req, res) {
	res.sendFile(path.join(__dirname,'/view', '/login.html'));

});
router.get('/forgotPassword', function(req, res) {
	res.sendFile(path.join(__dirname,'/view', '/forgotPassword.html'));

});

router.get('/userview', function(req, res) {
	res.sendFile(path.join(__dirname,'/view', '/userview.html'));

});

router.get('/seesolution', function(req, res) {
	res.sendFile(path.join(__dirname,'/view', '/seesolution.html'));

});

router.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname,'/view', '/index.html'));

});

router.get('/requestSolution', function(req, res) {
    res.sendFile(path.join(__dirname,'/view', '/requestSolution.html'));

});

router.get('/addQuestion',addQue.loadDiffifcultyLevel);

//Display leaderBoard.
router.get('/leaderBoard', function(req,resp){
  var sql1 = 'select username, POINTS from user ORDER BY POINTS DESC';
  con.query(sql1,function(err,result){
    if (err) throw err;
    console.log(result);
    resp.writeHead(200, {'Content-Type': 'text/html'});
        resp.write('<head>');
        //<!-- Required meta tags -->
        resp.write('<meta charset="utf-8">');
        resp.write('<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">');

        //<!-- Bootstrap CSS -->
        resp.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">');

        resp.write('<title>USER POINTS</title>');
        resp.write('</head>');
        resp.write('<body>');
    resp.write('<table class="table table-striped">');
    resp.write('<thead>');
    resp.write('<tr>');
    //resp.write('<th scope="col">UserID</th>');
    resp.write('<th scope="col">Username</th>');
    resp.write('<th scope="col">Points</th>');
    //resp.write('<th scope="col">Progress</th>');
    resp.write('</tr>');
    resp.write('</thead>');
    resp.write('<tbody>');
  Object.keys(result).forEach(function(key) {
                                    var row = result[key];
                                    //console.log(row.userID);
                                    //console.log(row.username);
                                    //console.log(row.points);
                                    resp.write('<tr>');
                                    //var data1 = '<td>'+row.userID+'</td>';
                                    var data2 = '<td>'+row.username+'</td>';
                                    var data3 = '<td>'+row.POINTS+'</td>';
                                    //var data4 = '<td> <div class ="progress"> <div class="progress-bar bg-success" role="progressbar" style="width: '+row.POINTS+'%" aria-valuenow="'+row.POINTS+'" aria-valuemin="0" aria-valuemax="100"></div> </div></td>'
                                    //console.log(data1);
                                    console.log(data2);
                                    console.log(data3);
                                    //resp.write(data1);
                                    resp.write(data2);
                                    resp.write(data3);
                                    //resp.write(data4);
                                    resp.write('</tr>');

                                    });
      resp.write('</tbody>');
      resp.write('</table>');
      resp.write('</body>');
      resp.write('</html>');
      resp.end();

  });
});

//DisplayPoints for all users by Admin
router.get('/displayPoints', function(req,resp){
  var sql1 = 'select * from user';
  con.query(sql1,function(err,result){
    if (err) throw err;
    console.log(result);
    resp.writeHead(200, {'Content-Type': 'text/html'});
        resp.write('<head>');
        //<!-- Required meta tags -->
        resp.write('<meta charset="utf-8">');
        resp.write('<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">');

        //<!-- Bootstrap CSS -->
        resp.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">');

        resp.write('<title>USER POINTS</title>');
        resp.write('</head>');
        resp.write('<body>');
    resp.write('<table class="table table-striped">');
    resp.write('<thead>');
    resp.write('<tr>');
    resp.write('<th scope="col">UserID</th>');
    resp.write('<th scope="col">Username</th>');
    resp.write('<th scope="col">Points</th>');
    resp.write('<th scope="col">Progress</th>');
    resp.write('</tr>');
    resp.write('</thead>');
    resp.write('<tbody>');
  Object.keys(result).forEach(function(key) {
                                    var row = result[key];
                                    console.log(row.userID);
                                    console.log(row.username);
                                    console.log(row.points);
                                    resp.write('<tr>');
                                    var data1 = '<td>'+row.userID+'</td>';
                                    var data2 = '<td>'+row.username+'</td>';
                                    var data3 = '<td>'+row.POINTS+'</td>';
                                    var data4 = '<td> <div class ="progress"> <div class="progress-bar bg-success" role="progressbar" style="width: '+row.POINTS+'%" aria-valuenow="'+row.POINTS+'" aria-valuemin="0" aria-valuemax="100"></div> </div></td>'
                                    console.log(data1);
                                    console.log(data2);
                                    console.log(data3);
                                    resp.write(data1);
                                    resp.write(data2);
                                    resp.write(data3);
                                    resp.write(data4);
                                    resp.write('</tr>');

                                    });
      resp.write('</tbody>');
      resp.write('</table>');
      resp.write('</body>');
      resp.write('</html>');
      resp.end();

  });
});

//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login);
router.post('/forgotPassword',login.forgotPassword);
router.post('/userview',solution.usersol);
router.post('/seesolution', upload.single('filetoupload'), solution.seesolution);
router.post('/addQuestion',addQue.addQuestion);
router.post('/requestSolution',requestSol.requestSolution);

app.use('/api', router);
app.listen(8080);
>>>>>>> master
