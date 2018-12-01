<<<<<<< HEAD
const fs = require('fs');
module.exports = {
singleProfile: (req, res) => {
        let Id = req.params.userId;
        let query = "SELECT * FROM `projecteuler` WHERE userId = '" + Id + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('UserProfile.ejs', {
=======
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

const fs = require('fs');
// module.exports = {
app.get('/edit/:userId', function(req, res, next) {
// singleProfile: (req, res) => {
        let Id = req.params.userId;
        let query = "SELECT * FROM users WHERE userID = '" + Id + "' ";
        connection.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            var filePath = process.cwd()+'/view/'+'UserProfile.ejs'
    										 res.render(filePath, {
>>>>>>> master
                title: "Display User"
                ,users: result[0]
                ,ID: Id
                ,message: ''
            });
        });
<<<<<<< HEAD
    }
};
=======
    })
module.exports = app
// };
>>>>>>> master
