const express = require('express');
var router = express.Router();
const Profile = require('../models/profileModel');
const cloudinary = require('cloudinary');
const path = require("path")

router.post('/profile', async (req, res) => {
    try {
        const file = req.files.avatar;
        const fileTwo = req.files.degreeUpload;
        const fileThree = req.files.certificateUpload;

        // console.log(file);

        const allowedExtension = [".png", ".jpg", ".jpeg"];
        const allowedExtensionTwoOrThree = [".pdf"];

        if (!allowedExtension.includes(path.extname(file.name))) {
            return res.status(422).json({
                message: "Invalid Image type profile picture should contain png, jpg, or jpeg",
            });
        }

        if (!allowedExtensionTwoOrThree.includes(path.extname(fileTwo.name))) {
            return res.status(422).json({
                message: "Invalid degree upload It should contain pdf",
            });
        }

        if (!allowedExtensionTwoOrThree.includes(path.extname(fileThree.name))) {
            return res.status(422).json({
                message: "Invalid certificate upload It should contain pdf",
            });
        }
        const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });
        const myCloudTwo = await cloudinary.v2.uploader.upload(fileTwo.tempFilePath, {
            folder: "degree",
        });
        const myCloudThree = await cloudinary.v2.uploader.upload(fileThree.tempFilePath, {
            folder: "certificate",
        });
        let data = JSON.parse(req.body.data)
        const { dateOfBirth, address, degreeDetails, skillSetsAndTrade, desc } = data;
        const userProfile = await Profile.create({
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
            dateOfBirth,
            address,
            degreeDetails,
            degreeUpload: {
                public_id: myCloudTwo.public_id,
                url: myCloudTwo.secure_url
            },
            skillSetsAndTrade,
            desc,
            certificateUpload: {
                public_id: myCloudThree.public_id,
                url: myCloudThree.secure_url
            }
        })
        res.status(200).json({ data: userProfile })
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e })
    }
})
module.exports = router;