function isAuthenticated(req, req, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/auth/login');
}

module.exports = isAuthenticated;