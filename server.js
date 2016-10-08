const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const indexHTML = require('./routes/index.js');

const PORT = 3000;

const buzzWords = {};


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/', indexHTML);


const server = app.listen(PORT, () => {
	console.log(`Server started on ${PORT}`)
})