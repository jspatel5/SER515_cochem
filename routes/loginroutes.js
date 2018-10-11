var mysql      = require('mysql');
var connection = mysql.createConnection({
		host: "localhost",
                user: "jinal",
                password: "jinal",
                database: "ProjectEuler" 
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

exports.register = function(req,res){
  // console.log("req",req.body);
  var today = new Date();
  var users={
    "userName":req.body.user_name,
    "firstName":req.body.first_name,
    "lastName":req.body.last_name,
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
  var userName= req.body.user_name;
  var password = req.body.password;
  connection.query('SELECT * FROM user WHERE userName = ?',[user_name], function (error, results, fields) {
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
        res.send({
          "code":200,
          "success":"login sucessfull"
            });
      }
      else{
        res.send({
          "code":204,
          "success":"Username and password does not match"
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
}


