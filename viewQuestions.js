var http = require("http");
var fs = require("fs");
var express = require('express');
var app = express();

var mysql      = require('mysql');
//var express = require('express');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'EulerProject',
});


connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });

var server = app.listen(9093, function () {
var host = server.address().address
var port = server.address().port
      console.log("Example app listening at %s : %s Port", host, port)
    });
app.get('/viewQuestions', function(req,resp){
  var sql1 = 'SELECT * FROM questions a, difficultyLevel b WHERE a.difficultyLevel = b.difficultyLevelID';
  connection.query(sql1,function(err,result){
    if (err) throw err;
    console.log(result);
resp.write('<head>');
   //<!-- Required meta tags -->
   resp.write('<meta charset="utf-8">');
   resp.write('<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">');

   //<!-- Bootstrap CSS -->
   resp.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">');

   resp.write('<title>QUESTIONS</title>');
   resp.write('</head>');
    resp.write('<table class="table table-striped">');
    resp.write('<thead>');
    resp.write('<tr>');
    resp.write('<th scope="col">Question</th>');
    resp.write('<th scope="col">Difficulty Level</th>');
    resp.write('</tr>');
    resp.write('</thead>');
    resp.write('<tbody>');
  Object.keys(result).forEach(function(key) {
                                    var row = result[key];
                                    console.log(row.questionStatement);
                                    console.log(row.difficultyLevel);
                                    resp.write('<tr>');
                                    var data1 = '<td>'+row.questionStatement+'</td>';
                                    var data2 = '<td>'+row.difficultyLevel+'</td>';
                                    console.log(data1);
                                    console.log(data2);
                                    resp.write(data1);
                                    resp.write(data2);
                                    resp.write('</tr>');

                                    });
      resp.write('</tbody>');
      resp.write('</table>');
      resp.end();

  });
});
