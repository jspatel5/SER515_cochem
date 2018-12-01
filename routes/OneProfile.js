<<<<<<< HEAD
const fs = require('fs');
module.exports = {
editProfile: (req, res) => {
        let userId = req.params.userId;
        let query = "SELECT * FROM `projecteuler` WHERE userId = '1' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('OneProfile.ejs', {
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
app.get('/', function(req, res, next) {
// editProfile: (req, res) => {
        let userId = req.params.userId;
        let query = "SELECT * FROM users WHERE userID = '1' ";
        connection.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            var filePath = process.cwd()+'/view/'+'OneProfile.ejs'
    										 res.render(filePath, {
>>>>>>> master
                title: "Display User"
                ,user: result[0]
                ,message: ''
            });
        });
<<<<<<< HEAD
    }
};
=======
    })
// };
module.exports = app
>>>>>>> master
