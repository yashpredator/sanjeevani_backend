const jwt=require("jsonwebtoken");
const User=require("../models/doctor/admin");
const bcrypt=require("bcrypt");
const asyncHandler=require("express-async-handler")

const protect = asyncHandler(async(req,res,next)=>{
    let token;
    try {
        token = req.cookies.jwt;
        const decoded = jwt.verify(token,'abc123');
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    }catch(err){
        res.status(401).json({error:err.message});
    }
});

module.exports=protect;
