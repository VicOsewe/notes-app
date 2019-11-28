const express = require('express');
const bodyParser = require('body-parser');
//creating an express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse requests of content-type - application/json
app.use(bodyParser.json())

//configuring the db
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//connecting to the db
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('successfully connceted to the database');
}).catch(err => {
    console.log('Could not connect to the database.');
    process.exit();
});

app.get('/', (req, res) => {
    res.json({'message':'welcome to notes app'});
});
//require note routes
require('./app/routes/note.route.js,')(app);


app.listen(3000, ()=> {
    console.log('server is listening on port 3000');
})