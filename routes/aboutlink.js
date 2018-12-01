<<<<<<< HEAD
module.exports = {
    aboutPage: (req, res) => {
             
            res.render('about.ejs', {
                title: "Welcome to Euler Project | Edit User Profile"
            });
        },

    };
=======
var express    = require("express");
var app = express();
var router = express.Router();

app.get('/', function(req, res, next) {
  var filePath = process.cwd()+'/view/'+'about.ejs'
               res.render(filePath, {
                title: "Welcome to Euler Project | Edit User Profile"
            });
        })


module.exports=app
>>>>>>> master
