var express    = require("express");
var app = express();
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({
		host: "localhost",
                user: "root",
                password: "Janice@2810",
                database: "ProjectEuler" 
});
app.use(express.static(__dirname + '/'));
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... ");
} else {
    console.log("Error connecting database in login routes... ");
}
});

exports.register = function(req,res){
  // console.log("req",req.body);
  var today = new Date();
  var users={
    "userName":req.body.userName,
    "firstName":req.body.firstName,
    "lastName":req.body.lastName,
    "email":req.body.email,
    "password":req.body.password,
    "userType":"User",
    "points":50,
    "created":today,
    "modified":today
  }
  connection.query('INSERT INTO user SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
  });
}

exports.login = function(req,res){
  var userName= req.body.userName;
  var password = req.body.password;
  var updatePointsQuery = "";
  var points = "";
  connection.query('SELECT * FROM user WHERE userName = ?',[userName], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if(results[0].password == password){
      	points = results[0].points;
       updatePointsQuery = "UPDATE user SET points = ? WHERE userName = ?"
      
		  	
		  	connection.query(updatePointsQuery,[points+10,userName], function (err, result) {
		  if (err) throw err;
		    console.log(result.affectedRows + " record(s) updated");
		  });
		
       res.send({
          "code":200,
          "success":"login sucessfull"
          });
      // send to user profile page
      }
      else{
        res.send({
          "code":204,
          "success":"Username and password does not match"
            });
         //res.sendFile(path.join(__dirname,'../','login.html'));
      }
    }
    else{
      res.send({
     "code":204,
        "success":"Username does not exits"
          });
      //res.send('/api/login');
      //sendFile(__dirname+"/"+"login.html");
    }
  }
  });

}
exports.forgotPassword = function(req,res){
	var userName= req.body.userName;
	var firstName= req.body.firstName;
	var lastName= req.body.lastName;
	var email= req.body.email;

	connection.query('SELECT * FROM user WHERE userName = ?',[userName], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if(results[0].firstName == firstName && results[0].lastName == lastName && results[0].email == email){
        res.send({
          "code":200,
          "password":results[0].password
            });
      // send to user profile page
      }
      else{
        res.send({
          "code":204,
          "success":" given parameters does not match with your profile."
            });
         //res.sendFile(path.join(__dirname,'../','login.html'));
      }
    }
    else{
      res.send({
     "code":204,
        "success":"Username does not exits"
          });
      //res.send('/api/login');
      //sendFile(__dirname+"/"+"login.html");
    }
  }
  });

}


