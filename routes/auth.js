const router = require('express').Router(),
Cart = require('../models/cart'),
User = require('../models/user'),
passport = require('passport');

//Login Page
router.get('/login',(req,res) =>{
    res.render('login');
})

//SignUp Page
router.get('/register',(req,res) =>{
    res.render('register');
})

//Register a new user or SignUp
router.post('/register',(req,res) =>{
    let newUser = {
        email:req.body.email,
        profile:{
            username:req.body.username,
            avatar:req.body.avatar
        },
        address:req.body.address
    }
    User.register(new User(newUser),req.body.password)
    .then(user =>{
        Cart.create({owner:user._id})
        .then(cart =>{
            passport.authenticate("local")(req,res,() =>{
                res.redirect('/profile');
        })
        })
    })
    .catch(err =>{
        req.flash('error',err.message);
        res.redirect('/register');
    })
})

//Login post request to login the user, if you get a 401 error then the user has entered wrong username or password
router.post('/login',passport.authenticate('local',{
    failureFlash:true,
    failureRedirect:'/auth/login'
}),(req,res) =>{
    req.flash('success',`Successfully logged in, Welcome ${req.user.profile.username}`)
    //Redirect to the profile page
    res.redirect('/profile')
})

//Facebook auth route
router.get('/facebook',passport.authenticate('facebook',{
    //Add more scopes if you want
    scope:['profile']
}))

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
}))

//Callback url for google
router.get('/google/redirect',passport.authenticate('google'),(req,res) =>{
    //Flash a success msg back to home
    req.flash('success',`Successfully logged in, Welcome ${req.user.profile.username}`);
    res.redirect('/');
})

//Auth Logout
router.get('/logout',(req,res) =>{
    req.logOut();
    //Redirect back to Home
    res.redirect('/');
})

module.exports = router;