var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });


var mysql = require('mysql');
var con = mysql.createConnection({
                                 host: "localhost",
                                 user: "root",
                                 password: "",
                                 database: "EulerProject"
                                 });

// Running Server Details.
  var server = app.listen(9093, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at %s : %s Port", host, port)
});

app.get('/difficultyLevel', function(req, res) {

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
        res.write('<title>select level</title>');
        res.write('</head>');
        res.write('<body>');
        res.write('<form action="/viewQuestions"  method="get" name="difficultyLevel">');
        res.write('<div class="form-group" style="margin-left:150px; margin-right:150px; margin-top:100px">');
        res.write('<label for="difficultyLevel">Select difficulty level</label>');
        res.write('<select class="form-control" id="difficultyLevel" name="difficultyLevel">');
        res.write('<option value="0">all</option>');
        Object.keys(result).forEach(function(key) {
                                    var row = result[key];
                                    console.log(row.difficultyLevelID)
                                    console.log(row.difficultyLevel)
                                    var data = '<option value=' + row.difficultyLevelID + '>' + row.difficultyLevel + '</option>';
                                    console.log(data);
                                    res.write(data);
                                    });
        res.write('</select>');
        res.write('</div>');
        res.write('<button type="submit" class="btn btn-primary" style="margin-left:150px; margin-right:150px">Submit</button>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');

      });

});


app.get('/viewQuestions', urlencodedParser, function (req, res){

        var id= req.query.difficultyLevel;
        console.log("Connected!");
        sql2 = "SELECT * FROM questions a, difficultyLevel b WHERE a.difficultyLevel = b.difficultyLevelID and a.difficultyLevel=" + id ;
        con.query(sql2,function(err,result){
                          if (err) throw err;
                          console.log(result);
        res.write('<head>');
        //<!-- Required meta tags -->
        res.write('<meta charset="utf-8">');
        res.write('<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">');
        //<!-- Bootstrap CSS -->
        res.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">');
        res.write('<title>QUESTIONS</title>');
        res.write('</head>');
        res.write('<table class="table table-striped">');
        res.write('<thead>');
        res.write('<tr>');
        res.write('<th scope="col">Question</th>');
        res.write('<th scope="col">Difficulty Level</th>');
        res.write('</tr>');
        res.write('</thead>');
        res.write('<tbody>');
        Object.keys(result).forEach(function(key) {
                              var row = result[key];
                              console.log(row.questionStatement);
                              console.log(row.difficultyLevel);
                              res.write('<tr>');
                              var data1 = '<td>'+row.questionStatement+'</td>';
                              var data2 = '<td>'+row.difficultyLevel+'</td>';
                              console.log(data1);
                              console.log(data2);
                              res.write(data1);
                              res.write(data2);
                              res.write('</tr>');
                               });
        res.write('</tbody>');
        res.write('</table>');
        res.write('</body>');
        res.write('</html>');
        res.end();

       });
  
  app.get('/viewProblemStatement', urlencodedParser, function (req, res){

              //var id= req.query.difficultyLevel;
              var id= req.query.QuestionId;

              console.log("Connected!");
              sql2 = "SELECT * FROM question where questionId = " + id; ;
              con.query(sql2,function(err,result){
                                if (err) throw err;
                                console.log(result);
              res.write('<head>');
              //<!-- Required meta tags -->
              res.write('<meta charset="utf-8">');
              res.write('<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">');
              //<!-- Bootstrap CSS -->
              res.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">');
              res.write('<title>QUESTIONS</title>');
              res.write('</head>');
              res.write('<table class="table table-striped">');
              res.write('<thead>');
              res.write('<tr>');
              res.write('<th scope="col">Question</th>');
              res.write('<th scope="col">Difficulty Level</th>');
              res.write('</tr>');
              res.write('</thead>');
              res.write('<tbody>');
              //Object.keys(result).forEach(function(key) {
                                    var row = result[key];
                                    console.log(row.questionStatement);
                                    console.log(row.difficultyLevel);
                                    res.write('<tr>');
                                    var data1 = '<td>'+row.questionStatement+'</td>';
                                    var data2 = '<td>'+row.difficultyLevel+'</td>';
                                    console.log(data1);
                                    console.log(data2);
                                    res.write(data1);
                                    res.write(data2);
                                    res.write('</tr>');
                                    // });
              res.write('</tbody>');
              res.write('</table>');
              res.write('</body>');
              res.write('</html>');
              res.end();

             });



      });

});
