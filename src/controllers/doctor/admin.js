// import asyncHandler from 'express-async-handler';
// import User from '../models/user.js';
// import generateToken from '../utils/generateToken.js';
const asyncHandler=require("express-async-handler")
const Doctor=require("../../models/doctor/admin.js")
const generateToken=require("../../utils/generateToken.js")
const bcrypt=require("bcrypt")

const authDoctor = asyncHandler(async (req,res)=>{
   try{
    const {username,password} = req.body;
    const user = await Doctor.findOne({username});
    if(!user) return res.status(404).json({"mssg":"Not found"})
    
    await user.matchPassword(password);
    // const isPasswordMatch = await user.matchPassword(password);
    // if (!isPasswordMatch) {
    //     return res.status(401).json({ error: "Invalid credentials" });
    // }

    generateToken(res,user._id);
    res.json({
        _id:user._id,
        name:user.name,
        email:user.email
    });
   }catch(err){
    res.status(401).json({error:err.message});
   }
});

const registerDoctor = asyncHandler(async(req,res)=>{
    try{
        const {name, username, age, workplace, phone, email, password, confirmPassword, qualification, specialization} = req.body;
        // const user=await User.findOne({email});
        const user = await Doctor.create({
            name, 
            username, 
            experience, 
            workplace, 
            email, 
            password, 
            confirmPassword, 
            specialization
        });

        generateToken(res, user._id);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        });
    }catch(err){
        res.status(400).json({error:err.message});
    }
});

const logoutDoctor = asyncHandler(async(req,res)=>{
    try{
        res.cookie('jwt','',{
            httpOnly:true,
            expires:new Date(0),
        });
        res.status(200).json({message:'logged out'});
    }catch(err){
        res.status(400).json({error:err.message});
    }
});

const getDoctorProfile = asyncHandler(async(req,res)=>{
    const {username}=req.body
    const user = await Doctor.findOne({username});
    try{
        if (user) {
            res.json({
              _id: user._id,
              username: user.username,
              email: user.email,
            });
        }
       else res.status(404).json({error:"Doctor not found"});
        
    }catch(err){
        res.status(404).json({error:err.message});
    }
});

const updateDoctorProfile = asyncHandler(async(req,res)=>{
    const {username}=req.body

    try{
        const user = await Doctor.findOne({username});
        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
        
            if (req.body.password) {
              user.password = req.body.password;
            }
        
            const updatedUser = await user.save();
        
            res.json({
              _id: updatedUser._id,
              username: updatedUser.username,
              email: updatedUser.email,
            });
        } 
    }catch(err){
        res.status(404).json({error:err.message});
    }
})

module.exports={authDoctor,logoutDoctor,getDoctorProfile,updateDoctorProfile, registerDoctor}