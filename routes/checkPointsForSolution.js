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
    console.log("Error connecting database in request solution module... ");
}
});

exports.requestSolution = function(req,res){

    var userName = req.body.userName;
    var sql1 = 'select * from user where userName=?';
                       connection.query(sql1,[userName], function (err, result) {
                                 if (err) {
                                 throw err;
                                 }else{
                                     console.log(result);
                                     if(result.length == 0){
                                        res.send({
                                            "code":204,
                                            "success":"Username does not exits"
                                            });

                                     }else{

                                        console.log(result[0].points);
                                         if(result[0].points>10){
                                             console.log("User has more than 10 points.");
                                             var filePath = process.cwd()+'/views/'+'showSolution.html';
                                             res.sendFile(filePath);
                                         }else{
                                             console.log("User does not have sufficient points.");
                                             var filePath = process.cwd()+'/views/'+'insufficientPoints.html';
                                             res.sendFile(filePath);
                                        }

                                     }

                                 }


                    });


}
