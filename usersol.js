var http = require('http');
var bodyParser=require('body-parser');
var express = require('express');
var app = express();
var fs = require('fs');
//var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: true });
var mysql = require('mysql');
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



// parse application/json
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/', function(req, res) {

        res.sendFile('userview.html', {root: __dirname })

});




app.post('/getSolution',function (req, res){



                     console.log("Connected!");

                     //console.log(req.body);
                     var questionID=req.body.questionID;
                     
                     console.log(questionID);
                    

                      
                      
                      var solpath;
                      connection.query('SELECT solutionPath from questions WHERE questionID = ?',[questionID], function (err, rows) {
    
                       if (err) throw err;
                      
                       console.log(rows[0].solutionPath);
                       var tempFile = rows[0].solutionPath;
                  
                       
                       console.log(tempFile);
                       fs.readFile(tempFile, function (err,data){
                       res.contentType("application/pdf");
                       res.send(data);
                    
                
});
                       });

                       

                            

         //});

});


