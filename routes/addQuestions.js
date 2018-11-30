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
    console.log("Error connecting database in add question module... ");
}
});

app.get('/index', function(req, res, next) {
  var filePath = process.cwd()+'/view/'+'index.html';
  res.sendFile(filePath);
})

app.get('/', function(req, res, next) {

		var sql1 = 'select * from difficultyLevel';

            connection.query(sql1,function (err, result) {
                 if (err) throw err;
                 console.log("Sql result : ");
                     console.log(result);
                     console.log("---------");
                     var filePath = process.cwd()+'/view/'+'addQuestion.ejs'
			         res.render(filePath, {
				        difficultyLevel_map : result,
								title: "Add QUESTION"

			    	});

         });

})


app.post('/addQuestion',function(req,res){

  var difficultyLevelID = req.body.difficultyLevel;
  var questionStatement = req.body.questionStatement;
  var answer = req.body.answer;
  var hint = req.body.hint;
  console.log(difficultyLevelID);
  console.log(questionStatement);
  console.log(answer);
  console.log(hint);

  var sql1 = 'INSERT INTO `questions` (`answer`,`questionStatement`,`hint`,`difficultyLevelID`) VALUES (?,?,?,?)';
  connection.query(sql1,[answer,questionStatement,hint,difficultyLevelID], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{

    console.log("1 row inserted.");
    //process.chdir("../");
    var filePath = process.cwd()+'/view/'+'addQuestionSuccess.html'
    //console.log(filePath);
    res.sendFile(filePath);
    //res.sendFile('addQuestionSuccess.html', {root: __dirname });

  }
  });
})

module.exports = app
