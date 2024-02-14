const express = require("express");
// const router = express.Router();
const user=require("../controllers/user.js");
// import express from 'express';

const router = express.Router();
const { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
 } =require( '../controllers/user.js');
// import { protect } from '../middleware/authMiddleare.js';
const protect=require("../middleware/auth.js")
router.post('/auth',(req,res)=>{
    res.send('/auth')
});
router.post('/',(req,res)=>{
    res.send('/')
});
router.post('/logout',(req,res)=>{
    res.send('/logout')
});
router.route('/profile')
    .get(protect,(req,res)=>{
        res.send('/getUserProfile')
    })
    .put(protect,(req,res)=>{
        res.send('/updateUserProfile')
    });

module.exports=router;