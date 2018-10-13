var http = require("http");
var fs = require("fs");
var express = require('express');
var app = express();

var mysql      = require('mysql');
//var express = require('express');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'd34dp00l',
  database : 'eulersProject',
  insecureAuth : true
});

connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });

    var server = app.listen(9093, function () {
    var host = server.address().address
    var port = server.address().port
          console.log("eulersProject listening at %s : %s Port", host, port)
        });
  app.get('/userProfile', function(req,resp) {
    var sql1 = 'select username from user where username = "sgupt182" ';
    connection.query(sql1,function(err,result){
      if (err) throw err;
      console.log(result);
      resp.writeHead(200, {'Content-Type': 'text/html'});
          resp.write('<head>');
          //<!-- Required meta tags -->
          resp.write('<meta charset="utf-8">');
          resp.write('<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">');

          //<!-- Bootstrap CSS -->
          resp.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">');

          resp.write('<title>USER Home Page</title>');
          resp.write('<style> div {padding : 10px; width:200px; height:200px ; text-align: justify;}');
          resp.write('</style');
          resp.write('</head>');
          resp.write('<body>');

          resp.write('<table class="table table-striped">');
          resp.write('<thead>');
          resp.write('<tr>');
          //resp.write('<th scope="col">UserID</th>');
          resp.write('<th scope="col">Username</th>');
          resp.write('<th scope="col">Points</th>');
          //resp.write('<th scope="col">Progress</th>');
          resp.write('</tr>');
          resp.write('</thead>');
          resp.write('<tbody>');
          Object.keys(result).forEach(function(key){
            var userP = result[key];
            resp.write('<tr>');
            var data = '<td>'  + userP.username + '</td>';
            var data1 = '<td>' + userP.POINTS + '</td>' ;
            //resp.write('<h1> Welcome </h1>');
            console.log(data);
            resp.write(data);
            resp.write(data1);
            resp.write('</tr>');
          });
          resp.write('</tbody>');
          resp.write('</table>');
          resp.write('</body>');
          resp.write('</html>');
          resp.end();

  });
});
