const User = require('../schema/user.schema');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const { validationResult } = require('express-validator');


// Register new user
exports.RegisterUser = async(req, res)=>{
    const {firstName, lastName, email, password} = req.body;

    // validating result
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    } 

    try {
          // check if email already exists
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({ message: 'User already exists' })
        }

         // hasing the password using gensalt and hash

         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);

         // create a new user
         user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
         });

         await user.save();

         // create and return jwt token
         const payload =  {id: user.id} ;
         const token = jwt.sign(payload, process.env.SECRET_JWT)

         res.status(200).json({message: "User registered successfully", token});

    } catch (error) {
        res.status(500).json({message: "error in registering user"});
    }
}

exports.userDetails = async(req,res)=>{
    const {username, bio, color} = req.body;
    try {
        const user = await User.findById(req.user.id);
        user.username = username;
        user.bio = bio;
        user.color = color;
        await user.save();
        res.status(200).json({message:"userdetails created"})
    } catch (error) {
        res.status(500).json({message: "error in userDetils"});
    }
}

// get all users
exports.getUsers = async(req,res)=>{
    try {
        const userId = req.user.id;
        console.log(userId)

        const user = await User.findById(userId).select('-password');
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        res.status(200).json({success: true, user});

    } catch (error) {
        console.error("Error in fetching user:", error.message);
        res.status(500).json({message: 'Error in fetching user'});
    }
}


// user login

exports.loginUser = async (req, res)=>{
    const {email, password} = req.body;

     //  validate user input
    if(!email || !password){
        return res.status(400).json({success:false, message: "Please provide email and password"});
    }

    // find user by email 
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({success:false, message:"User not found"})
        }

         // Check if password matches (assuming you use bcrypt for password encryption)
        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch){
            return res.status(400).json({success:false, message: "Invalid credentials"})
        }

         // Generate a JWT token with user id and email
         const token = jwt.sign({id: user._id, email:user.email}, process.env.SECRET_JWT);
         res.cookie("token",token)
         res.status(200).json({success:true, message: "User logged in successfully", token})
    } catch (error) {
        console.error('Error in logged in:', error.message)
        res.status(500).json({success:false, message:'Interal server error'});
    }
}

// update user
exports.updateUser = async (req, res) => {
    const { firstName, lastName, email, oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    try {
        // fetch the user
        const user = await User.findById(userId);

        // check if user exists
        if (!user) {
            return res.status(400).json({ success: false, msg: 'User not found' });
        }

        // update firstname if provided
        if (firstName && firstName !== user.firstName) {
            user.firstName = firstName;
        }

        // update lastname if provided
        if (lastName && lastName !== user.lastName) {
            user.lastName = lastName;
        }

        // update email if provided
        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ success: false, msg: 'Email already exists' });
            }
            user.email = email;
        }
        
        // save the user
        await user.save();

        res.status(200).json({ success: true, msg: 'User updated successfully' });
    } catch (error) {
        console.error('Error in updating user:', error.message);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
}

// delete user
exports.deleteUser = async (req, res) => {
    const userId = req.user.id;
    try {
        // Find and delete the user directly
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(400).json({ success:false, msg: 'User not found' });
        }

        res.status(200).json({ success: true, msg: 'User deleted successfully' });
    } catch (error) {
        console.error('Error in deleting user:', error.message);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};