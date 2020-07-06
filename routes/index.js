const router = require('express').Router(),
isAuthenticated = require('../middlewares/isAuthenticated');

//Home Route
router.get('/',(req,res) =>{
    res.locals.title = 'Home Page';
    res.render('home');
});

//Profile Route
router.get('/profile',isAuthenticated,(req,res) =>{
    res.render('profile');
})

module.exports = router;