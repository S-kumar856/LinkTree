const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoute = require('./routes/user.routes')
const linkRoute = require('./routes/links.router')


dotenv.config();
app.use(express.json());
app.use(cors());


// Define the port from environment or default to 5000
const PORT = process.env.PORT || 5000

// Route middleware for user authentication (register/login)
app.use('/api/user', userRoute);
app.use('/api/links', linkRoute);

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