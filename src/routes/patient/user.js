const express = require("express");
// const router = express.Router();
const user=require("../../controllers/patient/user.js");
// import express from 'express';

const router = express.Router();
const { 
    authUser,
    signup,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    addPatientToDoctor
 } =require( '../../controllers/patient/user.js');
// import { protect } from '../middleware/authMiddleare.js';
const {protect}=require("../../middleware/auth.js")
const {safety} = require("../../middleware/auth.js");
const { getProfile } = require("../../controllers/doctor/admin.js");

router.post('/signup',signup);
router.post('/login', authUser);
// router.post('/register',registerUser);
router.post('/logout', logoutUser);
router.post('/book',safety,addPatientToDoctor);
router.post('/review',safety,user.reviewProfile);
router.get('/book',safety,user.getAppointmentP);
router.get('/review',safety,getProfile);
// router.get('/doc)

router.route('/profile')
    .get(safety,getUserProfile)
    .put(protect,updateUserProfile);

module.exports=router;