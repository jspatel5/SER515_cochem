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
    console.log("Error connecting database in back routes... ");
}
});

// module.exports = {
app.get('/', function(req, res, next) {
    // goBack: (req, res) => {
        let query ="SELECT * FROM user ORDER BY points DESC"

        // execute query
        connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            var filePath = process.cwd()+'/view/'+'AllUsers.ejs'
    										 res.render(filePath, {
                title: "Welcome to Euler Project | Edit User Profile"
        ,users: result
            });
        });
    })
// };
module.exports = app
