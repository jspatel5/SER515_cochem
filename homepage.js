const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/mainpage');
const {aboutPage} = require('./routes/aboutlink');
const port = 8080;



// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/view'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload
app.use(express.static(__dirname + '/'));

// routes for the app

app.get('/', getHomePage);
app.get('/about', aboutPage);
app.get('/exit', getHomePage);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
