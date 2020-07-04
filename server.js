const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
PORT = process.env.PORT || 8080,
mongoose = require('mongoose'),
morgan = require('morgan');
require('dotenv/config');

//Connect to the db
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => console.log('Connected to the DB'))
.catch(err => console.log(err));

app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));

//Server started at port PORT
app.listen(PORT,() => console.log(`Server listening at port ${PORT}`))