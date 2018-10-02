var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });


var mysql = require('mysql');
var con = mysql.createConnection({
                                 host: "localhost",
                                 user: "jinal",
                                 password: "jinal",
                                 database: "ProjectEuler"
                                 });

// Running Server Details.
var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at %s : %s Port", host, port)
});

app.get('/index', function(req, res) {
        res.sendFile('index.html', {root: __dirname });
});
        
app.get('/solutionRequested', function(req, res) {
        
        
                    console.log("Connected!");
        
        res.sendFile('requestSolution.html', {root: __dirname })
});

app.get('/index', function(req, res) {
        res.sendFile('index.html', {root: __dirname });
        });

app.post('/solutionRequestedForUser', urlencodedParser, function (req, res){
         
         
                     console.log("Connected!");

                     //fetch difficulty level ID from database
                     
             
                     var userName = req.body.userName;
                     console.log(req.body.userName);
         
                       var sql1 = 'select * from user where userName=?';
                       con.query(sql1,[req.body.userName], function (err, result) {
                                 if (err) {
                                 throw err;
                                 }else{
                                 console.log(result);
                                 console.log(result[0].points);
                                 if(result[0].points>10){
                                     console.log("User has more than 10 points.");
                                     res.sendFile('showSolution.html', {root: __dirname });
                                 }else{
                                     console.log("User does not have sufficient points.");
                                     res.sendFile('insufficientPoints.html', {root: __dirname });
                                }
                                 }
                               
                       
                    });
                            
         
});
