const router = require('express').Router();

//Home Route
router.get('/',(req,res) => res.send('This is the HomePage'));

module.exports = router;