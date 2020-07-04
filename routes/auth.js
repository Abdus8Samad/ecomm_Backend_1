const router = require('express').Router();

//Home Route
router.get('/auth',(req,res) => res.send('Auth Routes'));

module.exports = router;