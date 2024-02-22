const express = require("express");
// const router = express.Router();
const user=require("../../controllers/doctor/admin.js");
// import express from 'express';

const router = express.Router();
const { 
    authDoctor,
    signup,
    logoutDoctor,
    getDoctorProfile,
    updateDoctorProfile
 } =require( '../../controllers/doctor/admin.js');

// import { protect } from '../middleware/authMiddleare.js';
const {protect,safety}=require("../../middleware/authDoc.js")

router.post('/doctor/signup',signup);
router.post('/doctor/login', authDoctor);
// router.post('/register',registerUser);
router.post('/doctor/logout', logoutDoctor);

router.get('/doctor', user.getDoctors) //It is defined
router.get('/book',user.getAppointmentD); //It is defined

router.route('/doctor/profile')
    .get(safety,getDoctorProfile)
    .put(safety,updateDoctorProfile);

// router.route('/doctor/')
module.exports=router;