const passport = require('passport'),
facebookStrategy = require('passport-facebook'),
User = require('../models/user');

passport.serializeUser((user,done) =>{
    done(null, user.id, )
})
passport.deserializeUser((id,done) =>{
    User.findById(id)
    .then(user =>{
        done(null, user)
    })
})

passport.use(new facebookStrategy({
    clientID:process.env.FACEBOOK_CLIENT_ID,
    clientSecret:process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL:'/facebook/redirect'
},( accessToken, refreshToken, profile, done ) =>{
    User.findOne({google:profile.id})
    .then(user =>{
        if(user){
            // Already have the user
            done(null, user);
        } else {
            // Create a new User
            User.create({
                email:profile.email,
                profile:{
                    username:profile.displayName,
                    avatar:profile.photos[0]
                },
                google:profile.id
            })
            .then(user =>{
                done(null, user)
            })
        }
    })
})
)