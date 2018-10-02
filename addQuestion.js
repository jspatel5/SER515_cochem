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
        
app.get('/addForm', function(req, res) {
        
        
                    console.log("Connected!");
                    
                    //fetch difficulty level ID from database
                
                    var sql1 = 'select * from difficultyLevel';
                    con.query(sql1,function (err, result) {
                              if (err) throw err;
                              console.log(result);
                             
                   
        
        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<head>');
        //<!-- Required meta tags -->
        res.write('<meta charset="utf-8">');
        res.write('<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">');
        
        //<!-- Bootstrap CSS -->
        res.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">');
        
        res.write('<title>Add Question!</title>');
        res.write('</head>');
        res.write('<body>');
        res.write('<form action="/addForm"  method="post" name="addForm">');
        res.write('<div class="form-group" style="margin-left:150px; margin-right:150px; margin-top:100px">');
        res.write('<label for="difficultyLevel">Select difficulty level</label>');
        res.write('<select class="form-control" id="difficultyLevel" name="difficultyLevel">');
        
        Object.keys(result).forEach(function(key) {
                                    var row = result[key];
                                    console.log(row.difficultyLevelID)
                                    console.log(row.difficultyLevel)
                                    var data = '<option value=' + row.difficultyLevelID + '>' + row.difficultyLevel + '</option>';
                                    console.log(data);
                                    res.write(data);
                                    });
        
       // res.write('<option value="1">Easy</option>');
        //res.write('<option value="2">Medium</option>');
        //res.write('<option value="3">Difficult</option>');
       
        res.write('</select>');
        res.write('</div>');
        res.write('<div class="form-group" style="margin-left:150px; margin-right:150px">');
        res.write('<label for="questionStatement">Question statement</label>');
       res.write('<input type="text" class="form-control" id="questionStatement" name="questionStatement" aria-describedby="questionStatementHelp" placeholder="Enter Question">');
        res.write('</div>');
        res.write('<div class="form-group" style="margin-left:150px; margin-right:150px">');
        res.write('<label for="answer">Answer</label>');
        res.write('<input type="text" class="form-control" id="answer" name="answer" placeholder="answer">');
        res.write('</div>');
        res.write('<div class="form-group" style="margin-left:150px; margin-right:150px">');
        res.write('<label for="hint">Hint</label>');
        res.write('<input type="text" class="form-control" id="hint" name="hint" placeholder="hint">');
        res.write('</div>');
        res.write('<button type="submit" class="btn btn-primary" style="margin-left:150px; margin-right:150px">Submit</button>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');

        return res.end();
         });
        
        //res.sendFile('addQuestion.html', {root: __dirname })
});

app.post('/addForm', urlencodedParser, function (req, res){
         
         
                     console.log("Connected!");

                     //fetch difficulty level ID from database
                     
             
                     var difficultyLevelID = req.body.difficultyLevel;
                     var questionStatement = req.body.questionStatement;
                     var answer = req.body.answer;
                     var hint = req.body.hint;
                     console.log(difficultyLevelID);
                     console.log(questionStatement);
                     console.log(answer);
                     console.log(hint);
                     
                                           
                     
                       var sql1 = 'INSERT INTO `questions` (`answer`,`questionStatement`,`hint`,`difficultyLevelID`) VALUES (?,?,?,?)';
                       con.query(sql1,[answer,questionStatement,hint,difficultyLevelID], function (err, result) {
                                 if (err) {
                                 throw err;
                                 }else{
                                 console.log("1 row inserted.");
                                 res.sendFile('addQuestionSuccess.html', {root: __dirname });
                                 });
                                 }
                       
                            
         
});
