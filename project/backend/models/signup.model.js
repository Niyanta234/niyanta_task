const mongoose = require('mongoose');
const crypto = require("crypto");

let UserSchema= new mongoose.Schema({
    fullName : {
        type:String , 
        required:true 
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobileNo:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

UserSchema.methods.getResetPasswordToken = function(){
    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");
    
    //Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

module.exports = mongoose.model('User',UserSchema)