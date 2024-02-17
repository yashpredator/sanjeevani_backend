const express = require("express");
// const router = express.Router();
const user=require("../../controllers/doctor/admin.js");
// import express from 'express';

const router = express.Router();
const { 
    authDoctor,
    registerDoctor,
    logoutDoctor,
    getDoctorProfile,
    updateDoctorProfile
 } =require( '../../controllers/doctor/admin.js');
// import { protect } from '../middleware/authMiddleare.js';
const protect=require("../../middleware/authDoc.js")

router.post('/doctor/register',registerDoctor);
router.post('/doctor/login', authDoctor);
// router.post('/register',registerUser);
router.post('/doctor/logout', logoutDoctor);

router.route('/doctor/profile')
    .get(protect,getDoctorProfile)
    .put(protect,updateDoctorProfile);

module.exports=router;