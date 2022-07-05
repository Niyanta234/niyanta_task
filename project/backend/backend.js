const express = require("express");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const paymentRoute = require("./routes/payment");
const profileRoute = require("./routes/profile")
const cors = require("cors");
const dotenv = require("dotenv");
const fileupload = require("express-fileupload");
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileupload(
  {
    useTempFiles: true,
    limits: {
      fileSize:   1024 
    }
  }
))
mongoose.connect(
  "mongodb://localhost:27017/user",
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("Successfully Established Connection with MongoDB");
    } else {
      console.log(
        "Failed to Establish Connection with MongoDB with Error: " + err
      );
    }
  }
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/user", userRoute);
app.use("/user", paymentRoute);
app.use("/user", profileRoute)
let port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});
