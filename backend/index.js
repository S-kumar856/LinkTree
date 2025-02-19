const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user.routes')
dotenv.config();

app.use(express.json())

// Define the port from environment or default to 5000
const PORT = process.env.PORT || 5000

// Route middleware for user authentication (register/login)
app.use('/api/user', userRoute);

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(PORT, ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to Mongodb ")
    }).catch((err)=>{
        console.log(err)
    })
    console.log(`Server is running on port ${PORT}`)
})