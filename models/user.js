const mongoose = require('mongoose'),
passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email:{type:String,unique:true,lowercase:true},
    facebook:String,
    google:String,
    profile:{
        username:{type:String,default:'anonymous'},
        avatar:{type:String,default:'https://www.pngitem.com/pimgs/m/522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile.png'}
    },
    password:String,
    address:String,
    history:{
        paid:{type:Number,default:0},
        item:{type:mongoose.Schema.Types.ObjectId, ref:'Product'}
    }
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',userSchema);

module.exports = User;