const jwt=require("jsonwebtoken");
const User=require("../models/user.js");
const bcrypt=require("bcrypt");
const asyncHandler=require("express-async-handler")

const protect = asyncHandler(async(req,res,next)=>{
    let token;
    try {
        token = req.cookies.jwt;
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    }catch(err){
        res.status(401).json({error:err.message});
    }
});

module.exports=protect;
