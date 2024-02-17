const asyncHandler=require("express-async-handler")
const User=require("../../models/patient/userReg.js")
const bcrypt=require("bcrypt")

const registerUser = asyncHandler(async(req,res)=>{
    try{
        const {name,age,username,address,phone,email,password,confirmPassword} = req.body;
        // const user=await User.findOne({email});
        const user = await User.create({
            name,
            age,
            username,
            address,
            phone,
            email,
            password,
            confirmPassword
        });

        // generateToken(res, user._id);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        });
    }catch(err){
        res.status(400).json({error:err.message});
    }
});

module.exports={registerUser}