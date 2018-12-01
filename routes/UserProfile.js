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
    console.log("Error connecting database in user profile routes... ");
}
});

const fs = require('fs');
// module.exports = {
app.get('/edit/:userId', function(req, res, next) {
// singleProfile: (req, res) => {
        let Id = req.params.userId;
        let query = "SELECT * FROM user WHERE userID = '" + Id + "' ";
        connection.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            var filePath = process.cwd()+'/view/'+'UserProfile.ejs'
    										 res.render(filePath, {
                title: "Display User"
                ,users: result[0]
                ,ID: Id
                ,message: ''
            });
        });
    })
module.exports = app
// };
