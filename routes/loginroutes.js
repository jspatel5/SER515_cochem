var express    = require("express");
var app = express();
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({
		host: "localhost",
                user: "jinal",
                password: "jinal",
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

	var respMessage = "";
	var filePath = process.cwd()+'/view/'+'registration.ejs';
  connection.query('SELECT * FROM user WHERE userName = ?',[req.body.userName], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    
      	respMessage = "Error occured while processing your request ";
      	res.render(filePath, {
				        response : respMessage
			    	});
			        
	  }else{
	  	if (results.length >0){
	  		respMessage = " User already exist with this user name. Try other username";

	  		console.log(respMessage);
	  		res.render(filePath, {
				        response : respMessage
			    	});
			         
	  		}else{
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

			  if (!req.body.firstName.trim() && !req.body.lastName.trim() && !req.body.password.trim()) {
    				respMessage = " First Name, Last Name, password can not be null"
    				res.render(filePath, {
				        response : respMessage
			    	});
				}else{
					connection.query('INSERT INTO user SET ?',users, function (error, results, fields) {
					  if (error) {
					    console.log("error ocurred",error);
					    respMessage = "Error occured while processing your request ";
					    res.render(filePath, {
				        response : respMessage
			    	});
								       
					  }else{
					    console.log('The solution is: ', results);
					    filePath = process.cwd()+'/view/'+'login.ejs';
					    respMessage = "user registered sucessfully"
					    res.render(filePath, {
				        response : respMessage
			    	});
					  }
					  });

				}

			  

	  		}

		}
		 
	});

 
}

exports.login = function(req,res){
  var userName= req.body.userName;
  var password = req.body.password;
  var updatePointsQuery = "";
  var points = "";
  var respMessage = "";
  connection.query('SELECT * FROM user WHERE userName = ?',[userName], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    var filePath = process.cwd()+'/view/'+'login.ejs'
      	respMessage = "Error occured while processing your request ";
			         res.render(filePath, {
				        response : respMessage
			    	});
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
      	var filePath = process.cwd()+'/view/'+'login.ejs'
      	respMessage = "Username and password does not match";
			         res.render(filePath, {
				        response : respMessage
			    	});
      }
    }
    else{
    	var filePath = process.cwd()+'/view/'+'login.ejs'
      	respMessage = "Username does not exist";
			         res.render(filePath, {
				        response : respMessage
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


