const mongoose=require('mongoose');
const cloudinary=require('cloudinary').v2;
const validator = require('validator');
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    fullName:{
        type:String,
        required:true
    },
    password:{
        required:true,
        type:String,
        validate(value) {
            if (!validator.isStrongPassword(value, {
                minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
            })) {
                throw new Error('Password is not strong enough.');
            }
        }
    },
    email:{
      type:String,
      required:true,
      unique:true,
    },
    profilePic: {
        type: Buffer,
    },
    AboutMe:{
        type:String,
    },
    role: {
        type: String,
        enum: ['user', 'superadmin'],
        default: 'user'
    }
});
const User = mongoose.model('User', userSchema);
module.exports = User;