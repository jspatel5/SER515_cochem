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
      console.log("Example app listening at %s : %s Port", host, port)
    });
app.get('/displayPoints', function(req,resp){
  var sql1 = 'select * from user';
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

        resp.write('<title>USER POINTS</title>');
        resp.write('</head>');
        resp.write('<body>');
    resp.write('<table class="table table-striped">');
    resp.write('<thead>');
    resp.write('<tr>');
    resp.write('<th scope="col">UserID</th>');
    resp.write('<th scope="col">Username</th>');
    resp.write('<th scope="col">Points</th>');
    resp.write('<th scope="col">Progress</th>');
    resp.write('</tr>');
    resp.write('</thead>');
    resp.write('<tbody>');
  Object.keys(result).forEach(function(key) {
                                    var row = result[key];
                                    console.log(row.userID);
                                    console.log(row.username);
                                    console.log(row.points);
                                    resp.write('<tr>');
                                    var data1 = '<td>'+row.userID+'</td>';
                                    var data2 = '<td>'+row.username+'</td>';
                                    var data3 = '<td>'+row.POINTS+'</td>';
                                    var data4 = '<td> <div class ="progress"> <div class="progress-bar bg-success" role="progressbar" style="width: '+row.POINTS+'%" aria-valuenow="'+row.POINTS+'" aria-valuemin="0" aria-valuemax="100"></div> </div></td>'
                                    console.log(data1);
                                    console.log(data2);
                                    console.log(data3);
                                    resp.write(data1);
                                    resp.write(data2);
                                    resp.write(data3);
                                    resp.write(data4);
                                    resp.write('</tr>');

                                    });
      resp.write('</tbody>');
      resp.write('</table>');
      resp.write('</body>');
      resp.write('</html>');
      resp.end();

  });
});
