const express = require("express");
// const router = express.Router();
const user=require("../controllers/user.js");
// import express from 'express';

const router = express.Router();
const { 
    authUser,
    signup,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
 } =require( '../controllers/user.js');
// import { protect } from '../middleware/authMiddleare.js';
const protect=require("../middleware/auth.js")

router.post('/signup',signup);
router.post('/login', authUser);
// router.post('/register',registerUser);
router.post('/logout', logoutUser);

router.route('/profile')
    .get(protect,getUserProfile)
    .put(protect,updateUserProfile);

module.exports=router;