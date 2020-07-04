const router = require('express').Router(),
isAuthenticated = require('../middlewares/isAuthenticated');

//Home Route
router.get('/',(req,res) => res.send('This is the HomePage'));

//Profile Route
router.get('/profile',isAuthenticated,(req,res) =>{
    res.render('profile');
})

module.exports = router;