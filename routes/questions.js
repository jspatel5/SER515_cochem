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

// SHOW LIST OF questions
app.get('/', function(req, res, next) {

	// req.getConnection(function(error, conn) {

		connection.query('select * from difficultyLevel',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				var filePath = process.cwd()+'/view/question/'+'list.ejs'
										 res.render(filePath, {
											 title: 'question List',
						 					data: rows
									});
			} else {
				var filePath = process.cwd()+'/view/question/'+'list.ejs'
										 res.render(filePath, {
											 title: 'question List',
						 					data: rows
									});
			}
		})
	// })
})


app.get('/questionlist/(:id)', function(req, res, next){
		var id=req.params.id;
		connection.query('select * from difficultyLevel left join questions left join userQuestion on questions.questionID = userQuestion.questionID on questions.difficultyLevel = difficultyLevel.difficultyLevelID where questions.difficultyLevel =' + id , function(err, rows, fields) {

			if (err) {
				req.flash('error', err)
				var filePath = process.cwd()+'/view/question/'+'questions.ejs'
										 res.render(filePath, {
											 title: 'question List',
						 					data: rows
									});
			} else {
				var filePath = process.cwd()+'/view/question/'+'questions.ejs'
										 res.render(filePath, {
											 title: 'question List',
						 					data: rows
									});
			}
		})
	// })
})

app.get('/problemStatement/(:id)', function(req, res, next){
	// req.getConnection(function(error, conn) {

		var id=req.params.id;
		connection.query('SELECT * FROM questions where questionID = ' + id, function(err, rows, fields) {

			if (err) {
				req.flash('error', err)
				var filePath = process.cwd()+'/view/question/'+'problemStatement.ejs'
										 res.render(filePath, {
											 title: 'question List',
						 					data: rows
									});
			} else {
				var filePath = process.cwd()+'/view/question/'+'problemStatement.ejs'
										 res.render(filePath, {
											 title: 'question List',
						 					data: rows
									});
			}
		})
	// })
})

app.get('/hint/(:id)', function(req, res, next){
	// req.getConnection(function(error, conn) {

		var id=req.params.id;
		connection.query('SELECT * FROM questions where questionID = ' + id, function(err, rows, fields) {

			if (err) {
				req.flash('error', err)
				var filePath = process.cwd()+'/view/question/'+'hint.ejs'
										 res.render(filePath, {
											 title: 'question List',
						 					data: rows
									});
			} else {
				var filePath = process.cwd()+'/view/question/'+'hint.ejs'
										 res.render(filePath, {
											 title: 'question List',
						 					data: rows
									});
			}
		})
	// })
})

app.post('/checkanswer/(:id)',function(req,res){
// exports.checkanswer = function(req,res){
	// req.getConnection(function(error, conn) {
		var id=req.params.id;
		var answer= req.body.answer;
		// var a;

		connection.query('SELECT * FROM questions where questionID = ' + id, function(err, rows, fields) {
			if (err) {
			    // console.log("error ocurred",error);
			    res.send({
			      "code":400,
			      "failed":"error ocurred"
			    });
			  }else{
			    // console.log('The solution is: ', results);
			    if(rows.length >0){
			      if(rows[0].answer == answer){
							connection.query('UPDATE users set points= points + 10 where userID = 1 ', function(err1) {
								if (err1) {
									res.send({
									"code":400,
									"failed":"error ocurred"
								});
								 }
					// send to question profile page
					});

					connection.query('INSERT INTO userQuestion (userID, questionID, noOfAttempts, status) VALUES (1, 5, 1,1 ) WHERE userID= 1', function(err1) {
						if (err1) {
							res.send({
							"code":400,
							"failed":"error ocurred"
						});
						 }
			// send to question profile page
			});
			        res.send({

			          "code":200,
			          "success":"correct answer"

					});
				}
			      else{
			        res.send({
			          "code":204,
			          "success":"incorrect answer"
			            });
			         //res.sendFile(path.join(__dirname,'../','views/question/answercheck'));
			      }
			    }
			  }
			  });
			// })
		})

		app.get('/progress', function(req, res, next) {

		    connection.query('select * from questions LEFT JOIN userQuestion on questions.questionID = userQuestion.questionID AND userQuestion.userID = 1',function(err,rows,fields){
					if (err) {
						req.flash('error', err)
						var filePath = process.cwd()+'/view/'+'displayProgressGrid.ejs'
												 res.render(filePath, {
													 title: 'progress',
								 					data: rows
											});
					} else {
						var filePath = process.cwd()+'/view/'+'displayProgressGrid.ejs'
												 res.render(filePath, {
													 title: 'progress',
								 					data: rows
											});
					}
				})
		})



module.exports = app
