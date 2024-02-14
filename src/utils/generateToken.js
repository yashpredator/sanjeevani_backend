// import jwt from 'jsonwebtoken';
const jwt=require("jsonwebtoken");


const generateToken = (res,userId) =>{
    const token = jwt.sign({userId},abc123,
    {
        expiresIn:'30d',
    });
    res.cookie('jwt',token,{
        httpOnly:true,
        secure:development !== 'development',
        sameSite:'strict',
        maxAge:30*24*60*60*1000,
    });
}

module.exports=generateToken;