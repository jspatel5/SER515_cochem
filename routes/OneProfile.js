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
    console.log("Error connecting database in OneProfile routes... ");
}
});

const fs = require('fs');
// module.exports = {
app.get('/', function(req, res, next) {
// editProfile: (req, res) => {
        let userId = req.params.userId;
        let query = "SELECT * FROM user WHERE userID = '1' ";
        connection.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            var filePath = process.cwd()+'/view/'+'OneProfile.ejs'
    										 res.render(filePath, {
                title: "Display User"
                ,user: result[0]
                ,message: ''
            });
        });
    })
// };
module.exports = app
