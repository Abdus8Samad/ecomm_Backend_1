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

//Privacy Policy
router.get('/p&p',(req,res) =>{
    res.render('privacy_policy')
})

//Terms and Conditions
router.get('/t&c',(req,res) =>{
    res.render('terms_and_conditions');
})
module.exports = router;