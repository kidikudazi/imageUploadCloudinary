const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors())
// load view engine
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public/')));


let webRoute = require('./routes/web');


app.use('/upload', webRoute);


const Port = process.env.PORT || 5000;

app.listen(Port, function() {
	// body...
	console.log(`server started on port ${Port}`);
})