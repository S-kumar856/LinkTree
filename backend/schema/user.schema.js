const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    username:{
        type:String,
    },
    bio:{
        type:String,
    },
    color:{
        type:String,
        default:"#000000"
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[6, 'Must be atleast 6 characters long']
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);