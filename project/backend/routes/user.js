const express = require('express');
var router = express.Router();
const User = require('../models/signup.model');
const bcrypt = require('bcryptjs');

router.post('/signup', async (req, res) => {

    try {
        console.log(req.body)
        const user = new User(req.body);
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        user.password = hashPassword
        console.log(user);
        await user.save();
        res.status(200).send(user);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

// router.post('/getuser', async (req, res) => {
//     console.log(req.body)
//     if (!req.body.userid) {
//         res.status(400).send({ message: "Content can not be empty!" });
//     }
//     UserModel.find({ _id: req.body.userid }).then(data => {
//         res.send({
//             message: " success!!",
//             user: data
//         });
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while getting user"
//         });
//     });

// })

// router.post('/login', async (req, res) => {
//     console.log(req.body)
//     if (!req.body.mail && !req.body.password) {
//         res.status(400).send({ message: "Content can not be empty!" });
//     }
//     UserModel.findOne({ email: req.body.mail, pass: req.body.password }).then(data => {
//         console.log("try again", data);
//         if (data != null) {
//             res.send({
//                 message: " success!!",
//                 user: data
//             });
//         } else {
//             res.status(500).send({
//                 message: "Invalid email or password"
//             });
//         }

//     }).catch(err => {
//         console.log("catch");

//         res.status(500).send({
//             message: err.message || "Invalid email or password"
//         });
//     });
// });

router.get('/test', (req,res) => {
    res.send("test")
})


module.exports = router;