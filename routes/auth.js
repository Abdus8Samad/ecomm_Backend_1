const router = require('express').Router(),
passport = require('passport');

//Login Page
router.get('/login',(req,res) =>{
    res.render('login');
})

//Facebook auth route
router.get('/facebook',passport.authenticate('facebook',{
    //Add more scopes if you want
    scope:['profile']
}),(req,res) =>{
    passport    
})

//Callback url for Facebook
router.get('/facebook/redirect',passport.authenticate('facebook'),(req,res) =>{
    //Flash a success msg back to home
    req.flash('success',`Successfully logged in, Welcome ${req.user.profile.username}`);
    res.redirect('/');
})

//Google auth route
router.get('/google',passport.authenticate('google',{
    //Add more scopes if you want
    scope:['profile']
}),(req,res) =>{
    passport    
})

//Callback url for google
router.get('/google/redirect',passport.authenticate('google'),(req,res) =>{
    //Flash a success msg back to home
    req.flash('success',`Successfully logged in, Welcome ${req.user.profile.username}`);
    res.redirect('/');
})

//Auth Logout
router.get('/logout',(req,res) =>{
    req.logOut();
    res.redirect('/');
})

module.exports = router;