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
    console.log("Error connecting database in progress routes... ");
}
});

app.get('/progress', function(req, res, next) {

	// req.getConnection(function(error, conn) {

		// connection.query('select * from difficultyLevel',function(err, rows, fields) {
    connection.query('select * from userQuestion where userQuestion.userID = 1',function(err,rows,fields){

    	//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('question/list', {
					title: 'question List',
					data: ''
				})
			} else {
				res.render('displayProgressGrid', {
					title: 'progress',
					data: rows
				})
			}
		})
	// })
})


// app.get('/progress', function(req,res,next){
//   connection.query('select * from userQuestion where userQuestion.userID = 1',function(err,rows,fields){
//     res.render('displayProgressGrid', {
//       title : 'Progress',
//       data : rows
//     })
//
//   })
// })
