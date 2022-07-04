const express = require('express');
var router = express.Router();
const Profile = require('../models/profileModel');
const cloudinary = require('cloudinary');

router.post('/profile', async (req, res) => {
    try {
        const myCloud = await cloudinary.v2.uploader.upload(req.files.avatar.tempFilePath, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });
        const myCloudTwo = await cloudinary.v2.uploader.upload(req.files.degreeUpload.tempFilePath, {
            folder: "degree",
        });
        const myCloudThree = await cloudinary.v2.uploader.upload(req.files.certificateUpload.tempFilePath, {
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