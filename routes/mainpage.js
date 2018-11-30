var express    = require("express");
var app = express();
var router = express.Router();

app.get('/', function(req, res) {
  var filePath = process.cwd()+'/view/'+'header.ejs'
               res.render(filePath, {
                 title: "Welcome to Euler Project | Edit User Profile",

            });
        })

module.exports=app
