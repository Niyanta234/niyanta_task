const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const paymentRoute = require('./routes/payment')

const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cors())

mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('Successfully Established Connection with MongoDB')
    }
    else {
        console.log('Failed to Establish Connection with MongoDB with Error: ' + err)
    }
});



app.use('/user', userRoute)
app.use('/user', paymentRoute)



let port = process.env.PORT;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});