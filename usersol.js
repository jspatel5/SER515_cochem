var mysql = require('mysql');
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

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



// parse application/json


app.get('/', function(req, res) {

        res.sendFile('userview.html', {root: __dirname })

});




app.get('/getSolution',urlencodedParser, function (req, res){



//connection.connect(function(err) {


                     //if (err) throw err;



                     console.log("Connected!");

                     console.log(req.body);
                     var questionID=req.body.questionID
                     console.log(questionID);
                    

                     
                       var solpath = connection.query('SELECT solutionPath from questions WHERE questionID = ?',[questionID], function (err, result) {
                       if (err) throw err;
                       //var tempFile = String(solpath);
                       var tempFile = "/Users/janiceabraham/Documents/JaniceAbraham_Resume.pdf";
                       //console.log(tempFile);
                       fs.readFile(tempFile, function (err,data){
                       res.contentType("application/pdf");
                       res.send(data);
                    });
                

                       //});

                            

         });

});


