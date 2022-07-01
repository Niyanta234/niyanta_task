const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const express = require("express");
var router = new express.Router();
const User = require("../models/userModel");
const sendEmail = require("../utils/sendmail");
// sign Up
router.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashPassword;
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
// sign In
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    if (!user) {
      return res.status(404).send("User Doesn't Exists");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send("Invalid Password");
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// View User Profile
router.get("/getuser/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).send("User Doesn't Exists");
  }
  res.status(200).send(user);
});

// forget Password
router.post("/password/forgot", async (req, res) => {
  // console.log("hii");
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send("User Not found");
  }
  // Get Resetpassword Token
  const resetToken = user.getResetPasswordToken();
  user.resetPasswordToken = resetToken;
  console.log(resetToken);
  await user.save({ validateBeforeSave: false });
  const resetPasswordURI = `http://localhost:4200/user/resetpassword/${resetToken}`;
  const message = `
  Your password reset token is :- \n\n ${resetPasswordURI}\n\n 
  If you have not requested this email then please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Job Link Password Recovery`,
      message,
    });
    res.status(200).json({message: `Email send  to ${user.email} Successfully`});
  } catch (e) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSav: false });
    res.status(500).json({error: e});
  }
});

// After Getting mail then useurl for reset the password
router.put("/resetpassword/:token", async (req, res) => {
  console.log(req.params)
  const resetPasswordToken = req.params.token;
  

  // console.log(resetPasswordToken);
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  console.log(user);
  if (!user) {
    return res
      .status(404)
      .json("Reset password Token Is Invalid Or Has Been Expired");
  }
  // if (req.body.password !== req.body.confirmPassword) {
  //   return res
  //     .status(404)
  //     .json({message: "Password Does Not Match with Confirm Password"});
  // }
  
  console.log("reset error",req.body);
  const hashPassword = await bcrypt.hash(req.body.password.newpass, 10);

  user.password = hashPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  res.status(200).json({data:user});
});

module.exports = router;