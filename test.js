var mysql = require('mysql');
var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var multer = require('multer');
var busboy=require('connect-busboy');
var upload = multer({ dest: 'uploads/' });
var formidable = require('formidable');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var connection = mysql.createConnection({
	
	host :'localhost',
	user : 'root',
	password : 'Janice@2810',
	database: 'Question'
});



var server = app.listen(8080, function () {

  var host = server.address().address

  var port = server.address().port

  console.log("Example app listening at %s : %s Port", host, port)

});

app.use(function (req, res, next) {
  //console.log(req.file); // JSON Object
  next();
});


app.get('/', function(req, res) {

        res.sendFile('seesolution.html', {root: __dirname })

});



//app.post('/addForm', urlencodedParser, function (req, res){
app.post('/addForm', upload.single('filetoupload'),function (req, res){

console.log(req.file); // JSON Object
var solutionname = req.file.originalname;


connection.connect(function(err) {


                     if (err) throw err;



                     console.log("Connected!");
                     console.log(solutionname);
                     
                       var sql1 = 'INSERT INTO `questions` (`solutionPath`) VALUES (?)';

                       

                       connection.query(sql1,[solutionname], function (err, result) {

                       if (err) throw err;

                       console.log("1 row inserted.");

                       });

                            

         });

});


