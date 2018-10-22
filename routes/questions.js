var express = require('express')
var app = express()

// SHOW LIST for difficultyLevel
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('select * from difficultyLevel',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('question/list', {
					title: 'question List',
					data: ''
				})
			} else {
				// render to views/question/list.ejs template file
				res.render('question/list', {
					title: 'question List',
					data: rows
				})
			}
		})
	})
})




app.get('/questionlist/(:id)', function(req, res, next){
	req.getConnection(function(error, conn) {
		var id=req.params.id;
		conn.query('SELECT * FROM questions a, difficultyLevel b WHERE a.difficultyLevel = b.difficultyLevelID and a.difficultyLevel=' + id , function(err, rows, fields) {

			if (err) {
				req.flash('error', err)
				res.render('question/list', {
					title: 'question List',
					data: ''
				})
			} else {
				// render to views/question/questions.ejs template file
				res.render('question/questions', {
					title: 'question List',
					data: rows
				})
			}
		})
	})
})

app.get('/problemStatement/(:id)', function(req, res, next){
	req.getConnection(function(error, conn) {
		var id=req.params.id;
		conn.query('SELECT * FROM questions where questionID = ' + id, function(err, rows, fields) {

			if (err) {
				req.flash('error', err)
				res.render('question/problemStatement', {
					title: 'question List',
					data: ''
				})
			} else {
				// render to views/question/problemStatement.ejs template file
				res.render('question/problemStatement', {
					title: 'question List',
					data: rows
				})
			}
		})
	})
})

app.get('/hint/(:id)', function(req, res, next){
	req.getConnection(function(error, conn) {
		var id=req.params.id;
		conn.query('SELECT * FROM questions where questionID = ' + id, function(err, rows, fields) {

			if (err) {
				req.flash('error', err)
				res.render('question/hint', {
					title: 'question List',
					data: ''
				})
			} else {
				// render to views/question/hint.ejs template file
				res.render('question/hint', {
					title: 'question List',
					data: rows
				})
			}
		})
	})
})

app.post('/checkanswer/(:id)',function(req,res){
	req.getConnection(function(error, conn) {
		var id=req.params.id;
		var answer= req.sanitize('answer').escape().trim();
		conn.query('SELECT * FROM questions where questionID = ' + id, function(err, rows, fields) {
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
			})
		})


app.get('/checkanswer1/(:answer)', function(req, res, next){
	req.getConnection(function(error, conn) {
		var answer=req.params.answer;
		conn.query('SELECT * FROM questions where questionID = ' + id, function(err, rows, fields) {

			if (err) {
				req.flash('error', err)
				res.render('question/hint', {
					title: 'question List',
					data: ''
				})
			} else {
				// render to views/question/list.ejs template file
				res.render('question/hint', {
					title: 'question List',
					data: rows
				})
			}
		})
	})
})

module.exports = app
