const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  text: String,
  stars: Number,
  user_id: String
});

const doctorSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, validate(value){if(!validator.isEmail(value)){throw new Error("Invalid Email address")}} },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

const RDoctor = new mongoose.model('patient', doctorSchema);

module.exports = RDoctor;