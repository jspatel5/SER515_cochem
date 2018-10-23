var express    = require("express");
var login = require('./routes/loginroutes');
var solution = require('./routes/usersolroutes');
var bodyParser = require('body-parser');
var path = require("path");
var app = express();
var fs = require('fs');
var multer = require('multer');
var busboy=require('connect-busboy');
var upload = multer({ dest: 'uploads/' });
var router = express.Router();
var async = require('async');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();

// test route
router.get('/register', function(req, res) {
	//res.sendFile('registration.html', {root: __dirname });
	//console.log(__dirname +'/view'+ '/registration.html');
	res.sendFile(path.join(__dirname,'/view', '/registration.html'));
	
   // res.json({ message: 'welcome to our upload module apis' });
});
router.get('/login', function(req, res) {
	res.sendFile(path.join(__dirname,'/view', '/login.html'));
   // res.json({ message: 'welcome to our upload module apis' });
});
router.get('/forgotPassword', function(req, res) {
	res.sendFile(path.join(__dirname,'/view', '/forgotPassword.html'));
   // res.json({ message: 'welcome to our upload module apis' });
});

router.get('/userview', function(req, res) {
	res.sendFile(path.join(__dirname,'/view', '/userview.html'));
   // res.json({ message: 'welcome to our upload module apis' });
});

router.get('/seesolution', function(req, res) {
	res.sendFile(path.join(__dirname,'/view', '/seesolution.html'));
   // res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login);
router.post('/userview',solution.usersol);
router.post('/seesolution', upload.single('filetoupload'), solution.seesolution);
//router.post('/forgotPassword',login.forgotPassword);
app.use('/api', router);
app.listen(8080);
