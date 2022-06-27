const express = require('express');
var router = express.Router();
const UserModel = require('../models/signup.model');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.send({
                message: "Hasing issue"
            })
        } else {
            console.log(req.body)
            if (!req.body.fnm && !req.body.mail && !req.body.mobile && !req.body.password) {
                res.status(400).send({ message: "Content can not be empty!" });
            }

            const user = new UserModel({
                fullname: req.body.fnm,
                email: req.body.mail,
                mob: req.body.mobile,
                pass: hash
            });
            console.log(user);

             user.save().then(data => {
                res.send({
                    message: "User created successfully!!",
                    user: data
                });
            }).catch(err => {
                if (err.code === 11000) {
                    res.send({
                        message: "Email already exists!!"
                    })
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating user"
                    });
                }

            });

        }
    })
})

router.post('/getuser', async (req, res) => {
    console.log(req.body)
    if (!req.body.userid) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    UserModel.find({ _id: req.body.userid }).then(data => {
        res.send({
            message: " success!!",
            user: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while getting user"
        });
    });

})

router.post('/login', async (req, res) => {
    console.log(req.body)
    if (!req.body.mail && !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    UserModel.findOne({ email: req.body.mail, pass: req.body.password }).then(data => {
        console.log("try again", data);
        if (data != null) {
            res.send({
                message: " success!!",
                user: data
            });
        } else {
            res.status(500).send({
                message: "Invalid email or password"
            });
        }

    }).catch(err => {
        console.log("catch");

        res.status(500).send({
            message: err.message || "Invalid email or password"
        });
    });



});


module.exports = router;