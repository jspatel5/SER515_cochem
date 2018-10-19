var express    = require("express");
var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');
var path = require("path");
var app = express();
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
//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login);
//router.post('/forgotPassword',login.forgotPassword);
app.use('/api', router);
app.listen(8080);
