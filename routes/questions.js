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
				res.render('question/list', {
					title: 'question List',
					data: ''
				})
			} else {
				res.render('question/list', {
					title: 'question List',
					data: rows
				})
			}
		})
	// })
})


app.get('/questionlist/(:id)', function(req, res, next){
	// req.getConnection(function(error, conn) {
		var id=req.params.id;
		connection.query('SELECT * FROM questions a, difficultyLevel b WHERE a.difficultyLevel = b.difficultyLevelID and a.difficultyLevel=' + id , function(err, rows, fields) {

			if (err) {
				req.flash('error', err)
				res.render('question/questions', {
					title: 'question List',
					data: ''
				})
			} else {
				res.render('question/questions', {
					title: 'question List',
					data: rows
				})
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
				res.render('question/problemStatement', {
					title: 'question List',
					data: ''
				})
			} else {
				res.render('question/problemStatement', {
					title: 'question List',
					data: rows
				})
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
				res.render('question/hint', {
					title: 'question List',
					data: ''
				})
			} else {
				res.render('question/hint', {
					title: 'question List',
					data: rows
				})
			}
		})
	// })
})

app.post('/checkanswer/(:id)',function(req,res){
	// req.getConnection(function(error, conn) {
		var id=req.params.id;
		var answer= req.sanitize('answer').escape().trim();
		connection.query('SELECT * FROM questions where questionID = ' + id, function(err, rows, fields) {
			if (err) {
			    // console.log("error ocurred",error);
			    res.send({
			      "code":400,
			      "failed":"error ocurred"
			    })
			  }else{
			    // console.log('The solution is: ', results);
			    if(rows.length >0){
			      if(rows[0].answer == answer){
			        res.send({
			          "code":200,
			          "success":"correct answer"
			            });
			      // send to question profile page
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


// app.get('/checkanswer1/(:answer)', function(req, res, next){
// 	// req.getConnection(function(error, conn) {
// 		var answer=req.params.answer;
// 		connection.query('SELECT * FROM questions where questionID = ' + id, function(err, rows, fields) {
//
// 			if (err) {
// 				req.flash('error', err)
// 				res.render('question/hint', {
// 					title: 'question List',
// 					data: ''
// 				})
// 			} else {
// 				res.render('question/hint', {
// 					title: 'question List',
// 					data: rows
// 				})
// 			}
// 		})
// 	// })
// })


module.exports = app
