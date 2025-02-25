const User  = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const registerUser = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        console.log(req.body);
        const existingUser = await  User.findOne({ email});
        if(existingUser){
            return res.status(400).json({ error: "User Already Exists"});
        }
         const user = new User({username, email, password});
         console.log(user);
         await user.save();
         res.status(201).json(user);
         console.log(user);
        }catch(error){
        res.status(500).json({ error: "Internal server error"})
    }
};

//USer LogIN:
const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({ error: "USER NOT FOUND"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({error: "INVALID USER DETAILS"});  
        }
         const token = jwt.sign(
            {userID: user._id,
             role: "Admin"},
              process.env.JWT_SECRET,
              {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            res.status(200).json({message: "Login Successful", token});
    } catch (error){
        console.error("error logging in user:", error);
        res.status(500).json({ error: "Internal server error"})
    } 
};

// Get User Information:
const getUserInfo = async (req, res) => {
    try{
        const {user} = req;
        res.status(200).json({ meassage: "You got the user Information" , user})

    }catch (error){
        res.status(500).json({ error: "Internal server error"})

    }
}

module.exports = {
    registerUser,
   loginUser,
   getUserInfo
     
};