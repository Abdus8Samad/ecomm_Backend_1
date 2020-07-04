const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
PORT = process.env.PORT || 8080,
mongoose = require('mongoose'),
passport = require('passport'),
flash = require('connect-flash'),
expressSession = require('express-session'),
morgan = require('morgan');
require('dotenv/config');

//Connect to the db
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(() => console.log('Connected to the DB'))
.catch(err => console.log(err));

app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
//Express Session
app.use(expressSession({
    secret:'My secret!!',
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Models
const Category = require('./models/category');

//Middleware for All your routes
app.use((req, res, next) => {
    // assign success msg to each route
    res.locals.success = req.flash('success')

    // assign error msg to each route
    res.locals.error = req.flash('error')

    // assign each route the user object
    res.locals.user = req.user;
    next();
});
//MiddleWare for Category search
app.use((req, res, next) =>{
    // Look for All the Categories Available in the DB
    Category.find()
    .then(all =>{
        res.locals.categories = all;
    })
    .catch(err =>{
       return next(err);
    })
})
//Routes
const indexRoutes = require('./routes/index'),
authRoutes = require('./routes/auth');
app.use('/',indexRoutes);
app.use('/auth',authRoutes);

//Server started at port PORT
app.listen(PORT,() => console.log(`Server listening at port ${PORT}`))