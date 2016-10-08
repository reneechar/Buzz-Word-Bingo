const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const home = require('./routes/index.js');

const PORT = 3000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/', home);


const server = app.listen(PORT, () => {
	console.log(`Server started on ${PORT}`)
})