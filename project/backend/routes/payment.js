const express = require('express');
var router = express.Router();
const PaymentModel = require('../models/payment.model');

router.post('/addpayment',async(req,res)=>{
    console.log(req.body);
    if(!req.body.nm && !req.body.cno && !req.body.date && !req.body.cvvno && !req.body.amt){
        req.status(400).send({message:"Content can not be empty! "});
    }
    
    const payment = new PaymentModel({
        name :req.body.nm,
        cardno : req.body.cno,
        expdate : req.body.date,
        cvv : req.body.cvvno,
        amount :req.body.amt
    })
    console.log(payment);
    
    await payment.save().then(data =>{
        req.send({
            message:"payment successfully",
            user:data
        });
    }).catch(err=>{
        res.send(500).send({
            message :err.message || "some error occurred while doing payment"
        });
    });
    
})

router.get('/paymenthistory',async(req,res)=>{
    console.log(req.body);
    if(!req.body.nm && !req.body.amt){
        res.status(400).send({message:"content can not be empty!"});
    }
    PaymentModel.findOne({name:req.body.nm , amount:req.body.amt}).then(data=>{
        console.log("try again",data);
        if(data!=null){
            res.send({
                message:"success!!",
                user:data
            });
        }
    }).catch(err=>{
        console.log("catch");
        res.status(500).send({
            message: err.message || "Invalid data"

        });
    });
    
})

module.exports = router;