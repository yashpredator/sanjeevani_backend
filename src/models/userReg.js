const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;
const bcrypt=require("bcryptjs")


const patientregSchema = new Schema({
    name: { type: String, required: false },
    username:{type: String, required: false },
    age: { type: Number, required: false },
    address: { type: String, required: false },
    phone: { type: String, required:false , unique: true },
    email: { type: String, required: false, unique: true, validate(value){if(!validator.isEmail(value)){throw new Error("Invalid Email address")}} },
    password: { type: String, required: false },
    confirmPassword: { type: String, required: false },
  });

  const RegPatient = new mongoose.model('patientreg', patientregSchema);
  
  module.exports = RegPatient;