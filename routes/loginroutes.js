var express    = require("express");
var app = express();
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "EulerProject"
});
app.use(express.static(__dirname + '/'));

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... ");
} else {
    console.log("Error connecting database in login routes... ");
}
});

app.get('/login', function(req, res, next) {
  var filePath = process.cwd()+'/view/'+'login.ejs';
  res.render(filePath, {
                response : "",
								title: "Login Page"
            });
})

app.get('/register', function(req, res, next) {
  var filePath = process.cwd()+'/view/'+'registration.ejs';
  res.render(filePath, {
                response : "",
								title: "Login Page"
            });
})

app.get('/forgotPassword', function(req, res, next) {
  var filePath = process.cwd()+'/view/'+'forgotPassword.ejs';
  res.render(filePath,{
		title : "forgotPassword"
	});
})


app.post('/register',function(req,res){

	var respMessage = "";
	var filePath = process.cwd()+'/view/'+'registration.ejs';
  connection.query('SELECT * FROM users WHERE userName = ?',[req.body.userName], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);

      	respMessage = "Error occured while processing your request ";
      	res.render(filePath, {
				        response : respMessage,
								title: "Login Page"
			    	});

	  }else{
	  	if (results.length >0){
	  		respMessage = " User already exist with this user name. Try other username";

	  		console.log(respMessage);
	  		res.render(filePath, {
				        response : respMessage,
								title: "Login Page"
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
				        response : respMessage,
								title: "Login Page"
			    	});
				}else{
					connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
					  if (error) {
					    console.log("error ocurred",error);
					    respMessage = "Error occured while processing your request ";
					    res.render(filePath, {
				        response : respMessage,
								title: "Login Page"
			    	});

					  }else{
					    console.log('The solution is: ', results);
					    filePath = process.cwd()+'/view/'+'login.ejs';
					    respMessage = "user registered sucessfully"
					    res.render(filePath, {
				        response : respMessage,
								title: "Login Page"
			    	});
					  }
					  });

				}



	  		}

		}

	});


})

app.post('/login',function(req,res){
  var userName= req.body.userName;
  var password = req.body.password;
  var updatePointsQuery = "";
  var points = "";
  var respMessage = "";
  connection.query('SELECT * FROM users WHERE username = ?',[userName], function (error, results, fields) {
  if (error) {
    var filePath = process.cwd()+'/view/'+'login.ejs'
      	respMessage = "Error occured while processing your request ";
			         res.render(filePath, {
				        response : respMessage,
								title: "Login Page"
			    	});
  }else{
    if(results.length >0){
      if(results[0].password == password){
      	points = results[0].points;
       updatePointsQuery = "UPDATE users SET points = ? WHERE username = ?"

		  	connection.query(updatePointsQuery,[points+10,userName], function (err, result) {
		  if (err) throw err;
		    console.log(result.affectedRows + " record(s) updated");
		  });

      if(results[0].userType == "Admin"){
        var filePath = process.cwd()+'/view/'+'adminProfile.ejs';
               res.render(filePath, {title: "Login Page"});
      }else if(results[0].userType == "User"){
				var filePath = process.cwd()+'/view/'+'OneProfile.ejs'
										 res.render(filePath, {
						title: "Display User"
						,user: results[0]
						,message: ''
				});
        // var filePath = process.cwd()+'/view/'+'UserProfile.ejs';
               // res.render(filePath, {});
      }

      //  res.send({
      //     "code":200,
      //     "success":"login sucessfull"
      //     });
       }
      else{
      	var filePath = process.cwd()+'/view/'+'login.ejs'
      	respMessage = "Username and password does not match";
			         res.render(filePath, {
				        response : respMessage,
								title: "Login Page"
			    	});
      }
    }
    else{
    	var filePath = process.cwd()+'/view/'+'login.ejs'
      	respMessage = "Username does not exist";
			         res.render(filePath, {
				        response : respMessage,
								title: "Login Page"
			    	});
    }
  }
  });

})

app.post('/forgotPassword',function(req,res){
	var userName= req.body.userName;
	var firstName= req.body.firstName;
	var lastName= req.body.lastName;
	var email= req.body.email;

	connection.query('SELECT * FROM users WHERE username = ?',[userName], function (error, results, fields) {
  if (error) {
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    if(results.length >0){
      if(results[0].firstName == firstName && results[0].lastName == lastName && results[0].email == email){
        res.send({
          "code":200,
          "password":results[0].password
            });
      }
      else{
        res.send({
          "code":204,
          "success":" given parameters does not match with your profile."
            });
      }
    }
    else{
      res.send({
     "code":204,
        "success":"Username does not exits"
          });
    }
  }
  });

})

module.exports = app
