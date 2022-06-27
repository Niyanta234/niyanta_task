const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema= new Schema({
    fullname : {
        type:String , 
        required:true 
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mob:{
        type:Number,
        required:true
    },
    pass:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('User',UserSchema)