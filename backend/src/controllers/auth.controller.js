import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const  signup=async (req, res)=>{
    const {fullName, email, password}= req.body;
    try {
        if(password.length<6){
            return res.status(400).json({message: "Password must be atleast 6 characters long"});
        }

        const user= await User.findOne({email});
        if(user) return res.status(400).json({message: "User already exists"});
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        const newUser= new User({
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser){
            // jwt logic
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }
        else {
            return res.status(400).json({message: "Invalid user data entered"});
        }
    } catch (error) {
        console.log("error in signup: ", error.message)
        res.status(500).json({message: "Internal server error"});
    }
}

export const login=async (req, res)=>{
    const {email, password} = req.body;
    try {
        if(!email || !password) return res.status(400).json({message: "both fields are required"});
        const user= await User.findOne({email});
        if(!user) return res.status(400).json({message: "User does not exist"});
        const isPassword= await bcrypt.compare(password, user.password);
        if(!isPassword) return res.status(400).json({message: "Invalid credentials, please try again"});
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("error in login: ", error.message)
        res.status(500).json({message: "Internal server error"});
    }
}

export const logout=async (req, res)=>{
    try {
        if (!req.cookies?.jwt) {
            return res.status(400).json({ message: "No active session found." });
        }
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message: "logged out successfully"});
    } catch (error) {
        console.log("error in logout: ", error.message)
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateProfile = async(req,res)=>{
    try {
        const {profilePic}= req.body;
        if(!profilePic){
            return res.status(400).json({message: "This field is required"});
        }
        const userID=req.user._id;
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser= await User.findByIdAndUpdate(userID, {profilePic: uploadResponse.secure_url},{new: true});
        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("error in updating profile: ", error.message)
        res.status(500).json({message: "Internal server error"});
    }
}

export const checkAuth= (req,res)=>{
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("error in checking authentication: ", error.message)
        res.status(500).json({message: "Internal server error"});
    }
}