const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let paymentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    cardno:{
        type:Number,
        required:true
    },
    expdate:{
        type:Date,
        required:true
    },
    cvv:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('Payment',paymentSchema)