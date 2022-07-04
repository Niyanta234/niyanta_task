const express = require('express');
var router = express.Router();
const Payment = require('../models/paymentModel');

router.post('/addpayment', async (req, res) => {
    try {
        const { fullName, cardNo, expiryDate, cvv, amount } = req.body;
        const userPayment = await Payment.create({
            fullName,
            cardNo,
            expiryDate,
            cvv,
            amount
        })
        res.status(200).json({ data: userPayment })
    } catch (e) {
        res.status(500).json({ error: e })
    }
})

router.get('/paymenthistory', async (req, res) => {

    try {
        const paymentHistory = await Payment.find();
        if (!paymentHistory) {
            res.status(500).json({ message: "Not Documents Found" })
        }
        res.status(200).json({ success: true, data: paymentHistory })
    } catch (e) {
        res.status(404).send(e);
    }
})

module.exports = router;