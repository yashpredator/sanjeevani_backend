const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;
const bcrypt=require("bcryptjs")

const reviewSchema = new Schema({
  text: String,
  stars: Number,
  user_id: String
});

const patientSchema = new Schema({
  name: { type: String, required: true },
  username:{type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, validate(value){if(!validator.isEmail(value)){throw new Error("Invalid Email address")}} },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

patientSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);

  
});
patientSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
};


const RPatient = new mongoose.model('patient', patientSchema);

module.exports = RPatient;