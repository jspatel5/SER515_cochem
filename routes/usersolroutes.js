var http = require('http');
var mysql = require('mysql');
var bodyParser=require('body-parser');
var express = require('express');
var app = express();
var fs = require('fs');
var multer = require('multer');
var busboy=require('connect-busboy');
var upload = multer({ dest: 'uploads/' });
var router = express.Router();
var async = require('async');
var connection = mysql.createConnection({
    host: "localhost",
                user: "root",
                password: "Janice@2810",
                database: "ProjectEuler" 
});

app.use(express.static(__dirname + '/'));
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});



exports.usersol = function(req,res){
                     
                     var questionID=req.body.questionID;
                     
                      var solpath;
                      connection.query('SELECT solutionPath from Questions WHERE questionID = ?',[questionID], function (err, rows) {
    
                       if (err) throw err;
                       
                       var tempFile = rows[0].solutionPath;
                       
                       fs.readFile(tempFile, function (err,data){
                       res.contentType("application/pdf");
                       res.send(data);
                    
                
});
                       });

                       

                            

         //});

}

exports.seesolution = function(req,res){
console.log(req.file);

var solutionname = "/Users/janiceabraham/Desktop/test"+req.file.originalname;
var filesArray = req.file;
var questionID=req.body.questionID


async.each(filesArray,function(file,eachcallback){
        async.waterfall([
        function (callback) {
          fs.readFile(req.file.path, (err, data) => {
            if (err) {
              console.log("err ocurred", err);
              }
            else {
              callback(null,data);
            }
            });
        },
        function (data, callback) {
          var writepath = "/Users/janiceabraham/Desktop/test";
          fs.writeFile(writepath + req.file.originalname, data, (err) => {
          if (err) {
            console.log("error occured", err);
          }
          else {
          callback(null, 'done');
          }
          });
        }
        ], function (err, result) {
          // result now equals 'done'
          //pass final callback to async each to move on to next file
          eachcallback();
        });
        },function(err){
          if(err){
              console.log("error ocurred in each",err);
          }
          else{
            console.log("finished prcessing");
        
          }
          });



                       //var sql1 = 'INSERT INTO `questions` (`questionID`,`solutionPath`) VALUES (?,?)';
                       var sq1 = "UPDATE Questions SET solutionPath='?' WHERE questionID='questionID'";
                       

                       //connection.query(sql1,[solutionname], function (err, result) {

                       connection.query('UPDATE Questions SET solutionPath = ? WHERE questionID = ?',[solutionname,questionID], function (err, result) {
                       if (err) {throw err; res.send("Fail");}

                       console.log("1 row inserted.");
                           res.send("Success");

                       });
                     

                            

         

}

