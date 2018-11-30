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
    console.log("Error connecting database in question.js routes... ");
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
		// connection.query('select * from questions LEFT OUTER JOIN difficultyLevel on questions.difficultyLevel = difficultyLevel.difficultyLevelID LEFT OUTER JOIN userQuestion on questions.questionID = userQuestion.questionID where questions.difficultyLevel =' + id , function(err, rows, fields) {
// select * from questions Left outer JOIN difficultyLevel on questions.difficultyLevel = difficultyLevel.difficultyLevelID Left outer join userQuestion on questions.questionID = userQuestion.questionID and userQuestion.userID= 1 where questions.difficultyLevel =2
		// req.getConnection(function(error, conn) {
			connection.query('select * from questions Left JOIN difficultyLevel on questions.difficultyLevel = difficultyLevel.difficultyLevelID Left join userQuestion on questions.questionID = userQuestion.qID and userQuestion.userID = 1 where questions.difficultyLevel =' + id , function(err, rows, fields) {
			console.log(" List the questions...");
			console.log(rows);
			if (err) {
				//req.flash('error', err);
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
											 response: "",
											 title: 'question List',
						 					data: rows
									});
			} else {
				var filePath = process.cwd()+'/view/question/'+'problemStatement.ejs'
										 res.render(filePath, {
											 response: "",
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
	 //req.getConnection(function(error, conn) {
		var id=req.params.id;
		var answer= req.body.answer;
		// var a;
		var respMessage = "";
		connection.query('SELECT * FROM questions where questionID = ' + id, function(err, rows, fields) {
			if (err) {
				respMessage = "Internal error occured : Please contact administrator.";
				var filePath = process.cwd()+'/view/question/'+'problemStatement.ejs';
				console.log("Check answer...")
				console.log(rows)
				res.render(filePath, {
					 response : respMessage,
					 title: 'question List',
					data: rows
			 });

			    // console.log("error ocurred",error);
			  }else{
			    // console.log('The solution is: ', results);
			    if(rows.length >0){
			      if(rows[0].answer == answer){
							connection.query('UPDATE user set points= points + 10 where userID = 1 ', function(err1) {
								if (err1) {
									respMessage = "Internal error occured : Please contact administrator.";
									var filePath = process.cwd()+'/view/question/'+'problemStatement.ejs';
									res.render(filePath, {
										 response : respMessage,
										 title: 'question List',
										data: rows
								 });
								 }
					// send to question profile page
					});

					connection.query('INSERT INTO userQuestion (userID, qID, noOfAttempts, status) VALUES (1, '+ id +', 1,1 )', function(err1) {
						if (err1) {
							respMessage = "Internal error occured : Please contact administrator.";
							var filePath = process.cwd()+'/view/question/'+'problemStatement.ejs';
							res.render(filePath, {
								 response : respMessage,
								 title: 'question List',
								data: rows
						 });
						 }
			// send to question profile page
			});
			var filePath = process.cwd()+'/view/'+'correctSolution.ejs';
			res.render(filePath,{
				title : "CorrectSolution",
			});
			// var filePath = process.cwd()+'/view/'+'index.ejs'
			// 						 res.render(filePath, {
			// 							title : 'correct answer'
			// 					});
				}
			      else{
							respMessage = "Your answer is not correct. Try again.";
							var filePath = process.cwd()+'/view/question/'+'problemStatement.ejs';
							res.render(filePath, {
								 response : respMessage,
								 title: 'question List',
								data: rows
						 });
							// var filePath = process.cwd()+'/view/'+'index.ejs'
							// 						 res.render(filePath, {
							// 							title : 'incorrect answer'
							// 					});
			         //res.sendFile(path.join(__dirname,'../','views/question/answercheck'));
			      }
			    }
			  }
			  });
			 // })
		})

		app.get('/progress', function(req, res, next) {
			// req.getConnection(function(error, conn) {
		    connection.query('select * from questions LEFT JOIN userQuestion on questions.questionID = userQuestion.qID AND userQuestion.userID = 1',function(err,rows,fields){
								console.log(rows);
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
		// })
});

module.exports = app
